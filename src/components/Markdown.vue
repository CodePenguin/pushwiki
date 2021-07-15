<template>
    <div v-html="compiledContent" />
</template>

<script>
import DOMPurify from 'dompurify'
import hljs from 'highlightJS'
import marked from "marked"

let mainHeading = null
let preClasses = "border p-1"
let tableClasses = ""

const renderer = {
  code(code, infostring) {
    const language = hljs.getLanguage(infostring) ? infostring : 'plaintext'
    const content = hljs.highlight(code, { language }).value
    return `<pre class="hljs ${preClasses}"><code class="language-${language}">${content}</code></pre>`
  },
  heading(text, level) {
    if (level === 1 && !this.mainHeading) {
      mainHeading = text
    }
    return false
  },
  table(header, body) {
    return `<table class="table ${tableClasses}"><thead>${header}</thead><tbody>${body}</tbody></table>`
  }
}

export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
      required: true,
    }
  },
  created() {
    preClasses = this.$root.settings?.markdown?.preClasses ?? preClasses
    tableClasses = this.$root.settings?.markdown?.tableClasses ?? tableClasses
    marked.use({ renderer })
    marked.setOptions({
      baseUrl: "#/"
    })
  },
  computed: {
    compiledContent() {
      mainHeading = null
      var content = DOMPurify.sanitize(marked(this.content));
      this.$emit('contentTitle', mainHeading)
      return content
    }
  }
}
</script>
