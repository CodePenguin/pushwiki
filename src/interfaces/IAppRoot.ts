import ISettings from '@/interfaces/ISettings'
import { InjectionKey } from 'vue'

export const AppRootKey: InjectionKey<IAppRoot> = Symbol('IAppRoot')

export interface IAppRoot {
  readonly settings: ISettings
  setSubTitle: (subtitle: string) => void
  updateRouterAnchors: (baseSelector: string) => void
}