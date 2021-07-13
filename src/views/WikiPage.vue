<template>
  <div v-if="loading">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="content != null">
    <Markdown :content="content" />
  </div>
  <div v-else>
    <h1>Page Not Found</h1>
    <p class="alert alert-secondary">
      This page does not exist yet!  Create a new file called "{{path}}" and refresh this page.
    </p>
  </div>
</template>

<script>
import Markdown from '@/components/Markdown.vue'
const axios = require('axios').default

export default {
  name: 'WikiPage',
  data() {
    return {
      loading: true,
      path: "",
      content: ""
    }
  },
  components: {
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
      this.path = path ?? "index.md"
      axios.get(this.path)
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
