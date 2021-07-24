<template>
  <header v-bind:class="headerClasses">
    <router-link to="/" v-bind:class="brandClasses">{{title}}</router-link>
    <div class="block lg:hidden">
      <button v-bind:class="buttonClasses" v-on:click="toggleNav">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <nav v-bind:class="navClasses">
      <router-link :to="link.path" v-bind:class="navLinkClasses" v-for="link in links" :key="link.title">{{link.title}}</router-link>
    </nav>          
  </header>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      navOpen: false
    }
  },
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttonClasses() {
      return this.settings.styles?.navigation?.button
    },
    brandClasses() {
      return this.settings.styles?.navigation?.brand
    },
    headerClasses() {
      return this.settings.styles?.navigation?.header
    },
    navClasses() {
      return (this.settings.styles?.navigation?.nav ?? '') + (!this.navOpen ? ' hidden' : '')
    },
    navLinkClasses() {
      return this.settings.styles?.navigation?.navLink
    },
    title() {
      return this.settings.title ?? 'PushWiki'
    },
    links() {
      return this.settings.navigation?.links ?? []
    }
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen
    }
  },
  watch: {
    $route() {
      this.navOpen = false
    }
  }
}
</script>
