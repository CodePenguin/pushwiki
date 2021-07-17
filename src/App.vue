<template>
  <div v-if="!loaded">
    <Loading />
  </div>
  <div v-else>
    <Navigation :settings="settings" />
    <main class="container mt-3">
      <router-view v-slot="{ Component }">
        <transition @after-leave="transitionDone">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Navigation from '@/components/Navigation.vue'
const axios = require('axios').default

export default {
  data() {
    return {
      loaded: false,
      settings: {}
    }
  },
  components: {
    Loading,
    Navigation
  },
  created() {
    axios.get("pushwiki.json")
      .then(response => {
        this.settings = response.data
        this.loaded = true
        this.setDocumentClasses()
        this.setSubTitle()
      })
      .catch(error => {
        if (error.response.status != 404) {
          console.log("Error retrieving settings", error)
        }
        this.loaded = true
      })
  },
  methods: {
    setDocumentClasses() {
      // Body Classes
      let classes = (this.settings.bodyClasses ?? '').split(' ')
      classes.forEach(c => document.body.classList.add(c))
    },
    setSubTitle(subtitle) {
      document.title = this.settings.title + (subtitle ? ' - ' + subtitle : '')
    },
    transitionDone () {
      if (this.$route.hash) {
        this.$nextTick(() => {
          let element = document.querySelector(this.$route.hash)
          element?.scrollIntoView()
        })
      }
    }
  }
}
</script>
