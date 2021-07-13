<template>
  <header class="d-flex flex-wrap justify-content-center px-3 py-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <span class="fs-4">PushWiki</span>
    </a>

    <ul class="nav nav-pills">
      <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
      <li class="nav-item"><router-link to="/examples.md" class="nav-link">Examples</router-link></li>
    </ul>
  </header>
  <main class="container">
    <router-view/>
  </main>
</template>
