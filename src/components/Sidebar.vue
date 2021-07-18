<template>
  <nav class="sidebar nav" :class="navClasses">
    <SidebarLink v-for="entry in nestedTableOfContents" :key="entry.slug" :entry="entry" :sidebarStyle="sidebarStyle"/>
  </nav>
</template>

<script>
import SidebarLink from '@/components/SidebarLink.vue'

export default {
  name: "Sidebar",
  props: {
    sidebarType: {
      type: String,
      required: true
    },
    tableOfContents: {
      type: Array
    }
  },
  created() {
    this.$root.updateRouterAnchors('.sidebar')
  },
  components: {
    SidebarLink
  },
  computed: {
    nestedTableOfContents() {
      const match = this.$root.settings.page?.sidebar?.headerLevels?.match(/^([1-6])(?:-([1-6]))?$/)
      let lowLevel = parseInt(match?.length > 2 ? match[1] : null)
      const highLevel = parseInt(match?.length > 2 ? match[2] : null) || lowLevel || 6
      lowLevel = lowLevel || 1

      const readEntry = (startingIndex, list) => {
        const entry = Object.assign({items: []}, this.tableOfContents[startingIndex])
        if (entry.level < lowLevel || entry.level > highLevel) return startingIndex + 1
        list.push(entry)
        let nextIndex = startingIndex + 1
        while (nextIndex < this.tableOfContents.length) {
          let nextEntry = this.tableOfContents[nextIndex]
          if (nextEntry.level <= entry.level) break
          nextIndex = readEntry(nextIndex, entry.items)
        }
        return nextIndex
      }

      const list = []
      let nextIndex = 0
      while (nextIndex < this.tableOfContents.length) {
        nextIndex = readEntry(nextIndex, list)
      }
      return list
    },
    navClasses() {
      return this.sidebarStyle?.nav
    },
    sidebarStyle() {
      switch (this.sidebarType) {
        case 'left': return this.$root.settings.styles?.page?.leftSidebar
        default: return null
      }
    }
  },
  mounted() {
    this.$root.updateRouterAnchors('.sidebar')
  },
  updated() {
    this.$root.updateRouterAnchors('.sidebar')
  }
}
</script>