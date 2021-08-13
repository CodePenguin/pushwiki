import DOMPurify from 'dompurify'
import ISettings from '@/interfaces/ISettings'
import marked from 'marked'
import TableOfContentsEntry from './TableOfContentsEntry'
import { IMarkdownProcessor } from '@/interfaces/IMarkdownProcessor'
import { Ref } from 'vue'
import { IMarkdownProcessorPlugin } from '@/interfaces/IMarkdownProcessorPlugin'

export default class MarkdownProcessor implements IMarkdownProcessor {
  private _settings: Ref<ISettings>
  private _tableOfContents: Array<TableOfContentsEntry> = []
  private _content: string | null = null
  private _mainHeading: string | null = null
  private _codePlugins: Array<IMarkdownProcessorPlugin> = []
  private _linkPlugins: Array<IMarkdownProcessorPlugin> = []
  private _afterProcessPlugins: Array<IMarkdownProcessorPlugin> = []
  private _beforeProcessPlugins: Array<IMarkdownProcessorPlugin> = []

  get content(): string | null {
    return this._content
  }

  get mainHeading(): string | null {
    return this._mainHeading
  }

  get tableOfContents(): Array<TableOfContentsEntry> {
    return this._tableOfContents
  }

  constructor(settings: Ref<ISettings>) {
    this._settings = settings
  }

  process(markdown: string): void {
    let mainHeading: string | null = null
    const preClasses = this._settings.value.styles.page.wikiPage.markdown.pre
    const tableClasses = this._settings.value.styles.page.wikiPage.markdown.table
    const tableOfContents: Array<TableOfContentsEntry> = []
    const codePlugins = this._codePlugins
    const linkPlugins = this._linkPlugins

    const renderer = {
      code(code, infostring, isEscaped) {
        let result: string | boolean = false
        for (const plugin of codePlugins) {
          result = !plugin.code || plugin.code(code, infostring, isEscaped)
          if (result) break
        }
        if (result) return result
        return `<pre class="${preClasses}"><code>${code}</code></pre>`
      },
      heading(text, level, raw, slugger) {
        if (level === 1 && !mainHeading) {
          mainHeading = text
        }
        const slug = slugger.slug(text.toLowerCase().replace(/[^\w]+/g, '-'))
        tableOfContents.push({ text, level, slug, entries: [] })
        return `<h${level} id="${slug}">${text}</h${level}>`
      },
      link(href, title, text) {
        let result: string | boolean = false
        for (const plugin of linkPlugins) {
          result = !plugin.link || plugin.link(href, title, text)
          if (result) break
        }
        return result
      },
      table(header, body) {
        return `<table class="${tableClasses}"><thead>${header}</thead><tbody>${body}</tbody></table>`
      }
    } as marked.RendererObject

    marked.use({ renderer })
    marked.setOptions({ baseUrl: '#/' })

    this._beforeProcessPlugins.forEach((plugin) => !plugin.beforeProcess || plugin.beforeProcess())

    const content = DOMPurify.sanitize(marked(markdown))

    this._afterProcessPlugins.forEach((plugin) => !plugin.afterProcess || plugin.afterProcess())

    this._content = content
    this._tableOfContents = tableOfContents
    this._mainHeading = mainHeading
  }

  registerPlugin(plugin: IMarkdownProcessorPlugin): void {
    if (plugin.beforeProcess) {
      this._beforeProcessPlugins.push(plugin)
    }
    if (plugin.code) {
      this._codePlugins.push(plugin)
    }
    if (plugin.link) {
      this._linkPlugins.push(plugin)
    }
    if (plugin.afterProcess) {
      this._afterProcessPlugins.push(plugin)
    }
  }
}
