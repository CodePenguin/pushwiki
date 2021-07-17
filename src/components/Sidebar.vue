<template>
  <nav class="sidebar nav" :class="navClasses">
    <SidebarLink v-for="entry in nestedTableOfContents" :key="entry.slug" :entry="entry" :sidebarSettings="sidebarSettings"/>
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
      const readEntry = (startingIndex, list) => {
        const entry = Object.assign({items: []}, this.tableOfContents[startingIndex])
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
      return this.sidebarSettings?.nav
    },
    sidebarSettings() {
      switch (this.sidebarType) {
        case 'left': return this.$root.settings.styles?.navigation?.leftSidebar
        default: return null
      }
    }
  },
  mounted() {
    this.$root.updateRouterAnchors('.sidebar')
  }
}
</script>