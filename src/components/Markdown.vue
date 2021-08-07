<template>
  <div class="markdown" v-html="compiledContent" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated } from 'vue'

import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/common'
import marked from 'marked'
import { useAppRoot } from '@/interfaces/IAppRoot'
import TableOfContentsEntry from '@/classes/TableOfContentsEntry'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const root = useAppRoot()

    let mainHeading: string | null = null
    let contentUpdated = false
    let preClasses = ''
    let tableClasses = ''
    let tableOfContents: Array<TableOfContentsEntry> = []

    const renderer = {
      code(code, infostring) {
        infostring = infostring ?? 'plaintext'
        const language = hljs.getLanguage(infostring) ? infostring : 'plaintext'
        const content = hljs.highlight(code, { language }).value
        return `<pre class="hljs ${preClasses}"><code class="language-${language}">${content}</code></pre>`
      },
      heading(text, level, raw, slugger) {
        if (level === 1 && !mainHeading) {
          mainHeading = text
        }
        const slug = slugger.slug(text.toLowerCase().replace(/[^\w]+/g, '-'))
        tableOfContents.push({ text, level, slug, entries: [] })
        return `<h${level} id="${slug}">${text}</h${level}>`
      },
      table(header, body) {
        return `<table class="${tableClasses}"><thead>${header}</thead><tbody>${body}</tbody></table>`
      }
    } as marked.RendererObject

    preClasses = root.settings.styles.page.wikiPage.markdown.pre
    tableClasses = root.settings.styles.page.wikiPage.markdown.table
    marked.use({ renderer })
    marked.setOptions({ baseUrl: '#/' })

    let compiledContent = computed(() => {
      const rawContent = props.content as string
      contentUpdated = true
      mainHeading = null
      tableOfContents = []
      var content = DOMPurify.sanitize(marked(rawContent))
      emit('contentTitle', mainHeading)
      emit('tableOfContents', tableOfContents)
      return content
    })

    function processContent() {
      if (!contentUpdated) return
      contentUpdated = false
      root.updateRouterAnchors('.markdown')
    }

    onMounted(processContent)
    onUpdated(processContent)

    return { compiledContent }
  }
})
</script>
