import { IMarkdownProcessorPlugin } from '@/interfaces/IMarkdownProcessorPlugin'
import ISettings from '@/interfaces/ISettings'
import hljs from 'highlight.js/lib/common'
import { Ref } from 'vue'

if (process.env.VUE_APP_BUNDLE_TYPE === 'base') {
  require('highlight.js/styles/' + process.env.VUE_APP_HIGHLIGHTJS_STYLE + '.css')
}

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
    let content = code
    let language = 'plaintext'
    if (hljs.getLanguage(infostring)) {
      language = infostring
      content = hljs.highlight(code, { language }).value
    }
    return `<pre class="${this._preClasses}"><code class="language-${language}">${content}</code></pre>`
  }
}
