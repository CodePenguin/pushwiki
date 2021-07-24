<template>
  <a :class="navLinkClasses" :href="'#' + entry.slug">{{entry.text}}</a>
  <nav class="nav" :class="childNavClasses" v-if="entry.items.length > 0">
    <SidebarLink :entry="subEntry" v-for="subEntry in entry.items" :key="subEntry.slug" :sidebarStyles="sidebarStyles" />
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
    sidebarStyles: {
      type: Object
    }
  },
  computed: {
    childNavClasses() {
      return this.sidebarStyles?.childNav
    },
    navLinkClasses() {
      return this.sidebarStyles?.navLink
    }
  }
}
</script>