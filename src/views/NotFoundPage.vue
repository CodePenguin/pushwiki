<template>
  <article class="page" :class="pageContentClasses">
    <h1>Page Not Found</h1>
    <p class="alert alert-danger">
      This page does not exist.
    </p>
  </article>
</template>

<script>
export default {
  name: 'NotFoundPage',
  computed: {
    pageContentClasses() {
      return this.$root.settings.styles?.page?.notFound.content
    }
  }
}
</script>
