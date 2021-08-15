<template>
  <article class="page" :class="pageContentClasses">
    <h1>Settings</h1>

    <h2>Current Settings</h2>
    <pre>{{ currentSettings }}</pre>

    <h2>Default Settings</h2>
    <pre>{{ defaultSettings }}</pre>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import DefaultSettings from '@/classes/DefaultSettings'
import { useAppRoot } from '@/interfaces/IAppRoot'

const root = useAppRoot()

let currentSettings = computed(() => root.settings)
let defaultSettings = computed(() => DefaultSettings)
let pageContentClasses = computed(() => root.settings.styles.page.settings.content)
</script>
