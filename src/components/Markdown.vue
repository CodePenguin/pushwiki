<template>
    <div v-html="compiledContent" />
</template>

<script>
import DOMPurify from 'dompurify';
import hljs from "highlight.js";
import marked from "marked";

const renderer = {
  table(header, body) {
    return `<table class="table"><thead>${header}</thead><tbody>${body}</tbody></table>`
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
      return DOMPurify.sanitize(marked(this.content))
    }
  }
}
</script>
