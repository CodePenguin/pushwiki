import { IMarkdownProcessorPlugin } from '@/interfaces/IMarkdownProcessorPlugin'
import { nextTick } from 'vue'

interface YouTubeEmbedEntry {
  id: string
  key: string
  query: string
}

export default class YouTubeEmbedMarkdownProcessorPlugin implements IMarkdownProcessorPlugin {
  private _entries: Array<YouTubeEmbedEntry>
  private _id: string

  constructor() {
    this._id = 'YEMDPP' + Date.now().toString()
    this._entries = []
  }

  beforeProcess(): void {
    this._entries = []
  }

  link(href: string | null, title: string | null, text: string): boolean | string {
    if (!href || text != '') return false
    if (!href.includes('youtu')) return false
    const match = href.match(/^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.?be)\/(?:[\w-]+\?v=|embed\/|v\/)?([\w-]+)(\S+)?/)
    if (match === null) return false
    const key = match[1]
    const query = match[2] ?? ''
    const id = `${this._id}_${this._entries.length}`
    this._entries.push({ id, key, query })
    return `<a id="${id}" />`
  }

  afterProcess(): void {
    nextTick(() => {
      for (const entry of this._entries) {
        const element = document.getElementById(entry.id)
        if (!element) continue
        const iframe = document.createElement('iframe')
        iframe.width = '560'
        iframe.height = '315'
        iframe.src = `https://www.youtube.com/embed/${entry.key}${entry.query}`
        iframe.title = 'YouTube video player'
        iframe.setAttribute('frameBorder', '0')
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        iframe.allowFullscreen = true
        element.replaceWith(iframe)
      }
    })
  }
}
