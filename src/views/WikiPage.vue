<template>
  <div v-if="loading" :class="pageLoadingClasses">
    <Loading/>
  </div>
  <div v-else-if="content != null" :class="wikiPageClasses">
    <Sidebar :sidebarStyles="sidebarStyles" :tableOfContents="tableOfContents" v-if="sidebarIsVisible" />
    <article :class="articleClasses">
      <Markdown :content="content" v-on:content-title="setSubTitle" v-on:table-of-contents="setTableOfContents" />
    </article>
  </div>
  <div v-else :class="pageNotFoundClasses">
    <h1>Page Not Found</h1>
    <p :class="pageNotFoundAlertClasses">
      This page does not exist yet!  Create a new file called "{{localPath}}" and refresh this page.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Loading from '@/components/Loading.vue'
import Markdown from '@/components/Markdown.vue'
import Sidebar from '@/components/Sidebar.vue'
const axios = require('axios').default

export default defineComponent({
  name: 'WikiPage',
  data() {
    return {
      loading: true,
      localPath: "",
      path: "",
      content: "",
      tableOfContents: []
    }
  },
  components: {
    Loading,
    Markdown,
    Sidebar
  },
  created() {
    var path = this.$route.params.path
    this.retrieveContent(path, (error, response) => {
      this.handleResponse(error, response)
    })
  },
  computed: {
    articleClasses () {
      return this.$root.settings.styles?.page?.wikiPage?.article
    },
    pageLoadingClasses() {
      return this.$root.settings.styles?.page?.loading?.content
    },
    pageNotFoundClasses() {
      return this.$root.settings.styles?.page?.notFound?.content
    },
    pageNotFoundAlertClasses() {
      return this.$root.settings.styles?.page?.notFound?.alert
    },
    sidebarIsVisible() {
      return this.tableOfContents.length > 1 || (this.tableOfContents.length === 1 && this.tableOfContents[0].level > 1)
    },
    sidebarStyles() {
      return this.$root.settings.styles?.page?.wikiPage?.sidebar
    },
    wikiPageClasses() {
      return this.$root.settings.styles?.page?.wikiPage?.content
    }
  },
  methods: {
    retrieveContent(path, callback) {
      this.path = path ?? "index"
      if (this.path.endsWith(".md")) {
        this.path = this.path.substring(0, this.path.length - 3)
      }
      this.localPath = this.path + ".md"
      axios.get(this.localPath)
        .then(response => {
          callback(undefined, response)
        })
        .catch(error => {
          callback(error, undefined)
        })
    },
    handleResponse(error, response) {
      if (error) {
        this.content = null
        this.loading = false
        if (error.response.status != 404) {
          console.log("Error retrieving content", error)
        }
      } else {
        this.content = response.data
        this.loading = false
      }
    },
    setSubTitle(subtitle) {
      this.$root.setSubTitle(subtitle)
    },
    setTableOfContents(tableOfContents) {
      this.tableOfContents = tableOfContents
    }
  },
  watch: {
    $route(to) {
      this.retrieveContent(to.params.path, (error, response) => {
        this.handleResponse(error, response)
      })
    }
  }
})
</script>
