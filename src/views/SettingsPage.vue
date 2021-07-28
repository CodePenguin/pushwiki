<template>
  <article class="page" :class="pageContentClasses">
    <h1>Settings</h1>

    <h2>Current Settings</h2>
    <pre>{{currentSettings}}</pre>

    <h2>Default Settings</h2>
    <pre>{{defaultSettings}}</pre>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import defaultSettings from '@/defaultSettings'

export default defineComponent({
  name: 'SettingsPage',
  computed: {
    pageContentClasses() {
      return this.$root.settings.styles?.page?.settings?.content
    },
    currentSettings() {
      return this.$root.settings
    },
    defaultSettings() {
      return defaultSettings
    }
  }
})
</script>
