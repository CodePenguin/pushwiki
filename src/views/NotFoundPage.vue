<template>
  <article class="page" :class="pageContentClasses">
    <h1>Page Not Found</h1>
    <p class="alert alert-danger">This page does not exist.</p>
  </article>
</template>

<script lang="ts" setup>
import { useAppRoot } from '@/interfaces/IAppRoot'
import { computed } from 'vue'

const root = useAppRoot()

let pageContentClasses = computed(() => root.settings.styles.page.notFound.content)
</script>
