<template>
  <div v-if="loading">
    <Loading/>
  </div>
  <div v-else-if="content != null">
    <Markdown :content="content" v-on:content-title="setSubTitle" />
  </div>
  <div v-else>
    <h1>Page Not Found</h1>
    <p class="alert alert-secondary">
      This page does not exist yet!  Create a new file called "{{localPath}}" and refresh this page.
    </p>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Markdown from '@/components/Markdown.vue'
const axios = require('axios').default

export default {
  name: 'WikiPage',
  data() {
    return {
      loading: true,
      localPath: "",
      path: "",
      content: ""
    }
  },
  components: {
    Loading,
    Markdown
  },
  created() {
    var path = this.$route.params.path
    this.retrieveContent(path, (error, response) => {
      this.handleResponse(error, response)
    })
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
    }
  },
  watch: {
    $route(to) {
      this.retrieveContent(to.params.path, (error, response) => {
        this.handleResponse(error, response)
      })
    }
  }
}
</script>
