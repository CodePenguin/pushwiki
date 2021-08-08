import { IMarkdownProcessorPlugin } from '@/interfaces/IMarkdownProcessorPlugin'

interface YouTubeEmbedEntry {
  key: string
}

export default class YouTubeEmbedMarkdownProcessorPlugin implements IMarkdownProcessorPlugin {
  private _entries: Array<YouTubeEmbedEntry> = []
  private _id: string = 'YEMDPP' + Date.now().toString()

  beforeProcess(): void {
    this._entries = []
  }

  link(href: string | null, title: string | null, text: string): boolean | string {
    const youtubeUrl = 'https://youtu.be/'
    if (!href || text != '') return false
    if (!href.startsWith(youtubeUrl)) return false
    const key = href.slice(youtubeUrl.length)
    if (!key.match(/\w+/)) return false
    this._entries.push({ key })
    return `{{${this._id}:${key}}}`
  }

  afterProcess?(content: string): boolean | string {
    let modifiedContent = content
    let modified = false
    this._entries.forEach((entry) => {
      modified = true
      modifiedContent = modifiedContent.replace(
        `{{${this._id}:${entry.key}}}`,
        `<iframe width="560" height="315" src="https://www.youtube.com/embed/${entry.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      )
    })
    return modified ? modifiedContent : false
  }
}
