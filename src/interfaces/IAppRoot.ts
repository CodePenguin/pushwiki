import ISettings from '@/interfaces/ISettings'
import { inject, InjectionKey } from 'vue'

export const AppRootKey: InjectionKey<IAppRoot> = Symbol('IAppRoot')

export interface IAppRoot {
  readonly settings: ISettings
  setSubTitle: (subtitle: string) => void
  updateRouterAnchors: (baseSelector: string) => void
}

export function useAppRoot(): IAppRoot {
  const resolved = inject(AppRootKey)
  if (!resolved) {
    throw new Error(`Could not resolve ${AppRootKey.description}`)
  }
  return resolved
}
