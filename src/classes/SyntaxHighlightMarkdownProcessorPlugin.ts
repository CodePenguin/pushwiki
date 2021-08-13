import { IMarkdownProcessorPlugin } from '@/interfaces/IMarkdownProcessorPlugin'
import ISettings from '@/interfaces/ISettings'
import hljs from 'highlight.js/lib/common'
import { Ref } from 'vue'

require('highlight.js/styles/' + process.env.VUE_APP_HIGHLIGHTJS_STYLE + '.css')

export default class SyntaxHighlightMarkdownProcessorPlugin implements IMarkdownProcessorPlugin {
  private _settings: Ref<ISettings>
  private _preClasses: string

  constructor(settings: Ref<ISettings>) {
    this._settings = settings
    this._preClasses = ''
  }

  beforeProcess(): void {
    this._preClasses = this._settings.value.styles.page.wikiPage.markdown.pre
  }

  code?(code: string, infostring: string | undefined): boolean | string {
    infostring = infostring ?? 'plaintext'
    const language = hljs.getLanguage(infostring) ? infostring : 'plaintext'
    const content = hljs.highlight(code, { language }).value
    return `<pre class="hljs ${this._preClasses}"><code class="language-${language}">${content}</code></pre>`
  }
}
