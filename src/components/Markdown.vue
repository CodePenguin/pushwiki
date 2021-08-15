<template>
  <div class="markdown" v-html="compiledContent" />
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, onMounted, onUpdated } from 'vue'

import { useAppRoot } from '@/interfaces/IAppRoot'
import { useMarkdownProcessor } from '@/interfaces/IMarkdownProcessor'
import TableOfContentsEntry from '@/classes/TableOfContentsEntry'

const props = defineProps<{
  content: string
}>()

const emit = defineEmits<{
  (e: 'contentTitle', title: string | null): void
  (e: 'tableOfContents', title: Array<TableOfContentsEntry>): void
}>()

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
</script>
