<template>
  <nav class="sidebar" :class="navClasses">
    <SidebarLinks :entries="nestedTableOfContents" :nested="false" :settings="settings" />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, onMounted, onUpdated } from 'vue'
import { IAppRoot, AppRootKey } from '@/interfaces/IAppRoot'
import SidebarLinks from '@/components/SidebarLinks.vue'
import TableOfContentsEntry from '@/classes/TableOfContentsEntry'

export default defineComponent({
  name: 'Sidebar',
  props: {
    tableOfContents: {
      type: Array as PropType<Array<TableOfContentsEntry>>
    }
  },
  components: {
    SidebarLinks
  },
  setup(props) {
    const root = inject<IAppRoot>(AppRootKey)
    const settings = root.settings

    let nestedTableOfContents = computed(() => {
      const tableOfContents = props.tableOfContents as Array<TableOfContentsEntry>
      const match = root.settings.page.sidebar.headerLevels.match(/^([1-6])(?:-([1-6]))?$/)
      let lowLevel = parseInt(match?.length > 2 ? match[1] : null)
      const highLevel = parseInt(match?.length > 2 ? match[2] : null) || lowLevel || 6
      lowLevel = lowLevel || 1

      const readEntry = (startingIndex: number, list: any[]) => {
        const entry = tableOfContents[startingIndex]
        if (entry.level < lowLevel || entry.level > highLevel) return startingIndex + 1
        list.push(entry)
        let nextIndex = startingIndex + 1
        while (nextIndex < tableOfContents.length) {
          let nextEntry = tableOfContents[nextIndex]
          if (nextEntry.level <= entry.level) break
          nextIndex = readEntry(nextIndex, entry.entries)
        }
        return nextIndex
      }

      const list = []
      let nextIndex = 0
      while (nextIndex < tableOfContents.length) {
        nextIndex = readEntry(nextIndex, list)
      }
      return list
    })

    let navClasses = computed(() => root.settings.styles.page.wikiPage.sidebar.nav)

    onMounted(() => root.updateRouterAnchors('.sidebar'))
    onUpdated(() => root.updateRouterAnchors('.sidebar'))

    root.updateRouterAnchors('.sidebar')
    return { navClasses, nestedTableOfContents, settings }
  }
})
</script>
