<template>
  <div v-if="!loaded">
    <Loading />
  </div>
  <div v-else>
    <Navigation />
    <main :class="mainClasses">
      <router-view v-slot="{ Component }">
        <transition @after-leave="transitionDone">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppRoot from '@/classes/AppRoot'
import { IAppRoot, AppRootKey } from '@/interfaces/IAppRoot'
import ISettings from '@/interfaces/ISettings'
import Loading from '@/components/Loading.vue'
import Navigation from '@/components/Navigation.vue'
import DefaultSettings from '@/classes/DefaultSettings'
import axios, { AxiosError, AxiosResponse } from 'axios'

export default defineComponent({
  components: {
    Loading,
    Navigation
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const loaded = ref(false)
    const settings = ref<ISettings>(DefaultSettings)
    const root = new AppRoot(router, settings)

    provide<IAppRoot>(AppRootKey, root)
    provide('settings', settings)

    let mainClasses = computed(() => settings.value.styles?.main ?? '')

    function setDocumentClasses() {
      // Body Classes
      let classes = (settings.value.styles.body ?? '').split(' ')
      classes.forEach((c: string) => {
        if (c !== '') document.body.classList.add(c)
      })
    }

    function setSubTitle(subtitle: string) {
      document.title = settings.value.title + (subtitle ? ' - ' + subtitle : '')
    }

    function transitionDone() {
      if (route.hash) {
        nextTick(() => {
          let header = document.querySelector<HTMLElement>('header')
          if (header == null) return
          let isHeaderSticky = getComputedStyle(header).position === 'sticky'
          let offset = isHeaderSticky ? header.clientHeight : 0
          let element = document.querySelector<HTMLElement>(route.hash)
          if (element == null) return
          window.scroll({
            top: element.offsetTop - offset,
            left: 0,
            behavior: 'auto'
          })
        })
      }
    }

    axios
      .get('pushwiki.json')
      .then((response: AxiosResponse) => {
        settings.value = Object.assign({}, DefaultSettings, response.data)
        loaded.value = true
        setDocumentClasses()
        setSubTitle('')
      })
      .catch((error: AxiosError) => {
        if (error.response?.status != 404) {
          console.log('Error retrieving settings', error)
        }
        loaded.value = true
      })

    return { loaded, mainClasses, transitionDone }
  }
})
</script>
