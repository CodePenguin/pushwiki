<template>
  <article class="page" :class="pageContentClasses">
    <h1>Page Not Found</h1>
    <p class="alert alert-danger">
      This page does not exist.
    </p>
  </article>
</template>

<script lang="ts">
import { IAppRoot, AppRootKey } from '@/interfaces/IAppRoot'
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'NotFoundPage',
  setup() {
    const root = inject<IAppRoot>(AppRootKey)

    let pageContentClasses = computed(() => root.settings.styles.page.notFound.content)

    return { pageContentClasses }
  }
})
</script>
