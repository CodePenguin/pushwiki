import DOMPurify from 'dompurify'
import ISettings from '@/interfaces/ISettings'
import hljs from 'highlight.js/lib/common'
import marked from 'marked'
import TableOfContentsEntry from './TableOfContentsEntry'
import { IMarkdownProcessor } from '@/interfaces/IMarkdownProcessor'
import { Ref } from 'vue'

export default class MarkdownProcessor implements IMarkdownProcessor {
  private _settings: Ref<ISettings>
  private _tableOfContents: Array<TableOfContentsEntry> = []
  private _content: string | null = null
  private _mainHeading: string | null = null

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

    const renderer = {
      code(code, infostring) {
        infostring = infostring ?? 'plaintext'
        const language = hljs.getLanguage(infostring) ? infostring : 'plaintext'
        const content = hljs.highlight(code, { language }).value
        return `<pre class="hljs ${preClasses}"><code class="language-${language}">${content}</code></pre>`
      },
      heading(text, level, raw, slugger) {
        if (level === 1 && !mainHeading) {
          mainHeading = text
        }
        const slug = slugger.slug(text.toLowerCase().replace(/[^\w]+/g, '-'))
        tableOfContents.push({ text, level, slug, entries: [] })
        return `<h${level} id="${slug}">${text}</h${level}>`
      },
      table(header, body) {
        return `<table class="${tableClasses}"><thead>${header}</thead><tbody>${body}</tbody></table>`
      }
    } as marked.RendererObject

    marked.use({ renderer })
    marked.setOptions({ baseUrl: '#/' })

    this._content = DOMPurify.sanitize(marked(markdown))
    this._tableOfContents = tableOfContents
    this._mainHeading = mainHeading
  }
}
