<template>
  <ul :class="ulClasses" v-if="entries.length > 0">
    <li :class="liClasses" v-for="entry in entries" :key="entry.slug">
      <a :class="navLinkClasses" :href="'#' + entry.slug">{{ entry.text }}</a>
      <SidebarLinks :entries="entry.entries" :nested="true" :settings="settings" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import TableOfContentsEntry from '@/classes/TableOfContentsEntry'
import { useAppRoot } from '@/interfaces/IAppRoot'
import ISettings from '@/interfaces/ISettings'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  entries: Array<TableOfContentsEntry>
  nested: boolean
  settings: ISettings
}>()

const root = useAppRoot()

let sidebarStyles = computed(() => root.settings.styles.page.wikiPage.sidebar)
let liClasses = computed(() => (!props.nested ? sidebarStyles.value.li : sidebarStyles.value.liNested))
let navLinkClasses = computed(() => sidebarStyles.value.navLink)
let ulClasses = computed(() => (!props.nested ? sidebarStyles.value.ul : sidebarStyles.value.ulNested))
</script>
