<template>
    <div class="markdown" v-html="compiledContent" />
</template>

<script>
import DOMPurify from 'dompurify'
import hljs from 'highlightJS'
import marked from "marked"

let mainHeading = null
let preClasses = "border p-1"
let tableClasses = ""
let contentUpdated = false

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
    preClasses = this.$root.settings?.markdown?.preClasses ?? preClasses
    tableClasses = this.$root.settings?.markdown?.tableClasses ?? tableClasses
    marked.use({ renderer })
    marked.setOptions({
      baseUrl: "#/"
    })
  },
  computed: {
    compiledContent() {
      contentUpdated = true
      mainHeading = null
      var content = DOMPurify.sanitize(marked(this.content));
      this.$emit('contentTitle', mainHeading)
      return content
    }
  },
  methods: {
    processContent() {
      if (!contentUpdated) return
      contentUpdated = false
      let pageHash = window.location.hash ?? '#/'
      let internalHashIndex = pageHash.indexOf('#', 1)
      if (internalHashIndex > -1) {
        pageHash = pageHash.substring(0, internalHashIndex)
      }
      var links = document.querySelectorAll('.markdown a')
      links.forEach(link => {
        if (!link.href) return
        let href = link.getAttribute('href')
        if (!href.startsWith('#')) return
        if (href.match(/^#[\w-]+$/)) {
          href = pageHash + href
          link.href = href
        }
        if (href.startsWith(pageHash)) {
          link.onclick = event => {
            event.preventDefault()
            this.$router.push(href.substring(1))
          }
        }
      })
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
