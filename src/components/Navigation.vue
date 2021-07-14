<template>
  <header class="d-flex flex-wrap justify-content-center px-3 py-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <span class="fs-4">{{title}}</span>
    </a>
    <ul class="nav nav-pills">
      <li class="nav-item" v-for="link in links" :key="link.title">
        <router-link :to="link.path" class="nav-link">{{link.title}}</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.settings.title ?? "PushWiki"
    },
    links() {
      return this.settings.navigation?.links ?? []
    }
  }
}
</script>
