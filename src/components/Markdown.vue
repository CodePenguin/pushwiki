<template>
    <div v-html="compiledContent" />
</template>

<script>
import DOMPurify from 'dompurify';
import hljs from "highlight.js";
import marked from "marked";

export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
      required: true,
    }
  },
  created() {
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
      return DOMPurify.sanitize(marked(this.content))
    }
  }
}
</script>

<style scoped>
@import "~highlight.js/styles/monokai-sublime.css";
</style>
