<template>
  <div class="markdown" v-html="compiledContent" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated } from 'vue'

import { useAppRoot } from '@/interfaces/IAppRoot'
import { useMarkdownProcessor } from '@/interfaces/IMarkdownProcessor'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const root = useAppRoot()
    const markdownProcesor = useMarkdownProcessor()

    let contentUpdated = false

    let compiledContent = computed(() => {
      markdownProcesor.process(props.content as string)
      contentUpdated = true
      emit('contentTitle', markdownProcesor.mainHeading)
      emit('tableOfContents', markdownProcesor.tableOfContents)
      return markdownProcesor.content
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
