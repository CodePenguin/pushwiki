<template>
    <div class="markdown" v-html="compiledContent" />
</template>

<script>
import DOMPurify from 'dompurify'
import hljs from 'highlightJS'
import marked from "marked"

let mainHeading = null
let contentUpdated = false
let preClasses = ""
let tableClasses = ""
let tableOfContents = []

const renderer = {
  code(code, infostring) {
    const language = hljs.getLanguage(infostring) ? infostring : 'plaintext'
    const content = hljs.highlight(code, { language }).value
    return `<pre class="hljs ${preClasses}"><code class="language-${language}">${content}</code></pre>`
  },
  heading(text, level, raw, slugger) {
    if (level === 1 && !this.mainHeading) {
      mainHeading = text
    }
    const slug = slugger.slug(text.toLowerCase().replace(/[^\w]+/g, '-'))
    tableOfContents.push({text, level, slug})
    return `<h${level} id="${slug}">${text}</h${level}>`
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
    preClasses = this.$root.settings.styles?.markdown?.pre
    tableClasses = this.$root.settings.styles?.markdown?.table
    marked.use({ renderer })
    marked.setOptions({
      baseUrl: "#/"
    })
  },
  computed: {
    compiledContent() {
      contentUpdated = true
      mainHeading = null
      tableOfContents = []
      var content = DOMPurify.sanitize(marked(this.content));
      this.$emit('contentTitle', mainHeading)
      this.$emit('tableOfContents', tableOfContents)
      return content
    }
  },
  methods: {
    processContent() {
      if (!contentUpdated) return
      contentUpdated = false
      this.$root.updateRouterAnchors('.markdown')
    }
  },
  mounted() {
    this.processContent()
  },
  updated() {
    this.processContent()
  }
}
</script>
