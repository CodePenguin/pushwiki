<template>
  <div v-if="!loaded">
    <Loading />
  </div>
  <div v-else>
    <Navigation :settings="settings" />
    <main :class="mainClasses">
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
import defaultSettings from '@/defaultSettings.js'
const axios = require('axios').default

export default {
  data() {
    return {
      loaded: false,
      settings: defaultSettings
    }
  },
  components: {
    Loading,
    Navigation
  },
  created() {
    axios.get("pushwiki.json")
      .then(response => {
        this.settings = Object.assign({}, defaultSettings, response.data)
        this.loaded = true
        this.setDocumentClasses()
        this.setSubTitle()
      })
      .catch(error => {
        if (error.response?.status != 404) {
          console.log("Error retrieving settings", error)
        }
        this.loaded = true
      })
  },
  computed: {
    mainClasses() {
      return this.settings.styles?.main
    }
  },
  methods: {
    setDocumentClasses() {
      // Body Classes
      let classes = (this.settings.styles?.body ?? '').split(' ')
      classes.forEach(c => { 
        if (c !== '') document.body.classList.add(c) 
      })
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
    },
    updateRouterAnchors(baseSelector) {
      let pageHash = window.location.hash ?? '#/'
      let internalHashIndex = pageHash.indexOf('#', 1)
      if (internalHashIndex > -1) {
        pageHash = pageHash.substring(0, internalHashIndex)
      }
      var links = document.querySelectorAll(baseSelector + ' a')
      links.forEach(link => {
        if (!link.href) return
        let href = link.getAttribute('href')
        if (!href.startsWith('#')) return
        if (href.match(/^#[\w-]+$/)) {
          href = pageHash + href
          link.href = href
        }
        if (href.startsWith(pageHash)) {
          link.onclick = event => {
            event.preventDefault()
            this.$router.push(href.substring(1))
          }
        }
      })
    }
  }
}
</script>
