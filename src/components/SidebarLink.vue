<template>
  <a class="nav-link" :href="'#' + entry.slug">{{entry.text}}</a>
  <nav class="nav" :class="childNavClasses" v-if="entry.items.length > 0">
    <SidebarLink :entry="subEntry" v-for="subEntry in entry.items" :key="subEntry.slug" :sidebarSettings="sidebarSettings" />
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
    sidebarSettings: {
      type: Object,
      required: true
    }
  },
  computed: {
    childNavClasses() {
      return this.sidebarSettings?.childNav
    }
  }
}
</script>