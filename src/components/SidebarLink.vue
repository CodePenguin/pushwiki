<template>
  <a :class="navLinkClasses" :href="'#' + entry.slug">{{entry.text}}</a>
  <nav class="nav" :class="childNavClasses" v-if="entry.items.length > 0">
    <SidebarLink :entry="subEntry" v-for="subEntry in entry.items" :key="subEntry.slug" :sidebarStyle="sidebarStyle" />
  </nav>
</template>

<script>
export default {
  name: "SidebarLink",
  props: {
    entry: {
      type: Object,
      required: true
    },
    sidebarStyle: {
      type: Object,
      required: true
    }
  },
  computed: {
    childNavClasses() {
      return this.sidebarStyle?.childNav
    },
    navLinkClasses() {
      return this.sidebarStyle?.navLink
    }
  }
}
</script>