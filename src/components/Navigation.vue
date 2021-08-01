<template>
  <header v-bind:class="headerClasses">
    <router-link to="/" v-bind:class="brandClasses">{{ title }}</router-link>
    <div class="block lg:hidden">
      <button v-bind:class="buttonClasses" v-on:click="toggleNav">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <nav v-bind:class="navClasses">
      <router-link :to="link.path" v-bind:class="navLinkClasses" v-for="link in links" :key="link.title">{{ link.title }}</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import ISettings from '@/interfaces/ISettings'
import { useRoute } from 'vue-router'
import { useAppRoot } from '@/interfaces/IAppRoot'

export default defineComponent({
  name: 'Navigation',
  setup() {
    const root = useAppRoot()
    const route = useRoute()

    const navOpen = ref(false)
    const buttonClasses = computed(() => (root.settings as ISettings).styles.navigation.button)
    const brandClasses = computed(() => root.settings.styles.navigation.brand)
    const headerClasses = computed(() => root.settings.styles.navigation.header)
    const navClasses = computed(() => root.settings.styles.navigation.nav + (!navOpen.value ? ' hidden' : ''))
    const navLinkClasses = computed(() => root.settings.styles.navigation.navLink)
    const title = computed(() => root.settings.title)
    const links = computed(() => root.settings.navigation.links)

    function toggleNav() {
      navOpen.value = !navOpen.value
    }
    watch(
      () => route.path,
      () => (navOpen.value = false)
    )

    return {
      brandClasses,
      buttonClasses,
      headerClasses,
      links,
      navClasses,
      navLinkClasses,
      navOpen,
      title,
      toggleNav
    }
  }
})
</script>
