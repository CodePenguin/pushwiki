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
import MarkdownProcessor from '@/classes/MarkdownProcessor'
import { IMarkdownProcessor, MarkdownProcessorKey } from './interfaces/IMarkdownProcessor'
import Loading from '@/components/Loading.vue'
import Navigation from '@/components/Navigation.vue'
import DefaultSettings from '@/classes/DefaultSettings'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { scrollToHash } from '@/classes/Utils'

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
    const markdownProcesor = new MarkdownProcessor(settings)

    provide<IAppRoot>(AppRootKey, root)
    provide<IMarkdownProcessor>(MarkdownProcessorKey, markdownProcesor)
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
        nextTick(() => scrollToHash(route.hash))
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
