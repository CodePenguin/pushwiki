<template>
  <div v-if="loading" :class="pageLoadingClasses">
    <Loading />
  </div>
  <div v-else-if="hasContent" :class="wikiPageClasses">
    <Sidebar :tableOfContents="tableOfContents" v-if="sidebarIsVisible" />
    <article :class="articleClasses">
      <Markdown :content="content" v-on:content-title="setSubTitle" v-on:table-of-contents="setTableOfContents" />
    </article>
  </div>
  <div v-else :class="pageNotFoundClasses">
    <h1>Page Not Found</h1>
    <p :class="pageNotFoundAlertClasses">This page does not exist yet! Create a new file called "{{ localPath }}" and refresh this page.</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import Loading from '@/components/Loading.vue'
import Markdown from '@/components/Markdown.vue'
import Sidebar from '@/components/Sidebar.vue'
import TableOfContentsEntry from '@/classes/TableOfContentsEntry'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useAppRoot } from '@/interfaces/IAppRoot'
import { useRoute } from 'vue-router'

const route = useRoute()
const root = useAppRoot()

const loading = ref(true)
const localPath = ref('')
const path = route.params.path
const content = ref('')
const tableOfContents = ref<Array<TableOfContentsEntry>>([])

const articleClasses = computed(() => root.settings.styles.page.wikiPage.article)
const hasContent = computed(() => content.value !== '')
const pageLoadingClasses = computed(() => root.settings.styles.page.loading.content)
const pageNotFoundClasses = computed(() => root.settings.styles.page.notFound.content)
const pageNotFoundAlertClasses = computed(() => root.settings.styles.page.notFound.alert)
const sidebarIsVisible = computed(() => tableOfContents.value.length > 1 || (tableOfContents.value.length === 1 && tableOfContents.value[0].level > 1))
const wikiPageClasses = computed(() => root.settings.styles.page.wikiPage.content)

function handleError(newLocalPath: string, error: AxiosError) {
  localPath.value = newLocalPath
  content.value = ''
  loading.value = false
  if (error?.response?.status != 404) {
    console.log('Error retrieving content', error)
  }
}
function handleResponse(newLocalPath: string, response: AxiosResponse) {
  localPath.value = newLocalPath
  content.value = response.data
  loading.value = false
}

function retrieveContent(path: string) {
  path = !path || path == '/' ? root.settings.defaultPage : path
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  if (path.endsWith('/')) {
    path = path + root.settings.defaultPage
  }
  if (path.endsWith('.md')) {
    path = path.substring(0, path.length - 3)
  }
  const newLocalPath = path + '.md'
  axios
    .get(newLocalPath)
    .then((response: AxiosResponse) => handleResponse(newLocalPath, response))
    .catch((error: AxiosError) => handleError(newLocalPath, error))
}

function setSubTitle(subtitle: string) {
  root.setSubTitle(subtitle)
}

function setTableOfContents(newTableOfContents: Array<TableOfContentsEntry>) {
  tableOfContents.value = newTableOfContents
}

retrieveContent(path as string)

watch(
  () => route.path,
  () => {
    const routeName = (route.name as string) ?? ''
    if (routeName.startsWith('wiki-page')) retrieveContent(route.path)
  }
)
</script>
