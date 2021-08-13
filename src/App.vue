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
import SyntaxHighlightMarkdownProcessorPlugin from '@/classes/SyntaxHighlightMarkdownProcessorPlugin'
import YouTubeEmbedMarkdownProcessorPlugin from '@/classes/YouTubeEmbedMarkdownProcessorPlugin'

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

    function loadExternals() {
      for (const link of settings.value.externals.links) {
        const element = document.createElement('link') as HTMLLinkElement
        Object.assign(element, link)
        document.body.appendChild(element)
      }
      for (const script of settings.value.externals.scripts) {
        const element = document.createElement('script') as HTMLScriptElement
        Object.assign(element, script)
        document.body.appendChild(element)
      }
    }

    function initializePlugins() {
      if (settings.value.plugins.syntaxHighlight) markdownProcesor.registerPlugin(new SyntaxHighlightMarkdownProcessorPlugin(settings))
      if (settings.value.plugins.youtubeEmbed) markdownProcesor.registerPlugin(new YouTubeEmbedMarkdownProcessorPlugin())
    }

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
        loadExternals()
        initializePlugins()
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
