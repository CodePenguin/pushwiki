import { IAppRoot } from '@/interfaces/IAppRoot'
import ISettings from '@/interfaces/ISettings'
import { Ref } from 'vue'
import { Router } from 'vue-router'

export default class AppRoot implements IAppRoot {
  private _router: Router
  private _settings: Ref<ISettings>

  get settings() {
    return this._settings.value
  }

  constructor(router: Router, settings: Ref<ISettings>) {
    this._router = router
    this._settings = settings
  }

  setSubTitle(subtitle: string) {
    document.title = this._settings.value.title + (subtitle ? ' - ' + subtitle : '')
  }

  updateRouterAnchors(baseSelector: string) {
    let pageHash = window.location.hash ?? '#/'
    const internalHashIndex = pageHash.indexOf('#', 1)
    if (internalHashIndex > -1) {
      pageHash = pageHash.substring(0, internalHashIndex)
    }
    const links = document.querySelectorAll<HTMLAnchorElement>(baseSelector + ' a')
    links.forEach(link => {
      let href = link.getAttribute('href') ?? ''
      if (!href.startsWith('#')) return
      if (href.match(/^#[\w-]+$/)) {
        href = pageHash + href
        link.href = href
      }
      if (href.startsWith(pageHash)) {
        link.onclick = event => {
          event.preventDefault()
          this._router.push(href.substring(1))
        }
      }
    })
  }
}