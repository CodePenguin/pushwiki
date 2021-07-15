<template>
    <div v-html="compiledContent" />
</template>

<script>
import DOMPurify from 'dompurify';
import hljs from "highlight.js";
import marked from "marked";

let mainHeading = null
let tableClasses = "table"

const renderer = {
  heading(text, level) {
    if (level === 1 && !this.mainHeading) {
      mainHeading = text
    }
    return false;
  },
  table(header, body) {
    return `<table class="${tableClasses}"><thead>${header}</thead><tbody>${body}</tbody></table>`
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
    tableClasses = this.$root.settings?.markdown?.tableClasses ?? tableClasses
    marked.use({ renderer })
    marked.setOptions({
      baseUrl: "#/",
      highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      }
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
