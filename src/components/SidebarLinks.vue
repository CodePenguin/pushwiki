<template>
  <ul :class="ulClasses" v-if="entries.length > 0">
    <li :class="liClasses" v-for="entry in entries" :key="entry.slug">
      <a :class="navLinkClasses" :href="'#' + entry.slug">{{entry.text}}</a>
      <SidebarLinks :entries="entry.entries" :nested="true" :sidebarStyles="sidebarStyles" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "SidebarLinks",
  props: {
    entries: {
      type: Array,
      required: true
    },
    nested: {
      type: Boolean,
      required: true
    },
    sidebarStyles: {
      type: Object
    }
  },
  computed: {
    navLinkClasses() {
      return this.sidebarStyles?.navLink ?? ''
    },
    liClasses() {
      return (!this.nested ? this.sidebarStyles?.li : this.sidebarStyles?.liNested) ?? ''
    },
    ulClasses() {
      return (!this.nested ? this.sidebarStyles?.ul : this.sidebarStyles?.ulNested) ?? ''
    }
  }
})
</script>