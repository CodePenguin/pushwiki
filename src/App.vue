<template>
  <div v-if="!loaded">
    <div class="text-center m-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else>
    <header class="d-flex flex-wrap justify-content-center px-3 py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4">{{settings.title}}</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item" v-for="link in settings.navigation.links" :key="link.title">
          <router-link :to="link.path" class="nav-link">{{link.title}}</router-link>
        </li>
      </ul>
    </header>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
const axios = require('axios').default

export default {
  data() {
    return {
      loaded: false,
      settings: {
        title: "PushWiki",
        navigation: {
          links: []
        }
      }
    }
  },
  created() {
    axios.get("settings.json")
    .then(response => {
      this.settings = response.data
      this.loaded = true
    })
    .catch(error => {
      if (error.response.status != 404) {
        console.log("Error retrieving settings", error)
      }
      this.loaded = true
    })
  },
}
</script>
