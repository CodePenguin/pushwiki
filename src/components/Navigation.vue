<template>
  <header class="navbar navbar-expand-lg" v-bind:class="navbarClasses">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">{{title}}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in links" :key="link.title">
            <router-link :to="link.path" class="nav-link">{{link.title}}</router-link>
          </li>
        </ul>
      </div>          
    </div>
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
    navbarClasses() {
      return [
        'navbar-' + (this.settings.navigation?.style ?? "dark"),
        'bg-' + (this.settings.navigation?.background ?? "primary")
      ]
    },
    title() {
      return this.settings.title ?? "PushWiki"
    },
    links() {
      return this.settings.navigation?.links ?? []
    }
  }
}
</script>
