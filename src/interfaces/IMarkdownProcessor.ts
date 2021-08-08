import TableOfContentsEntry from '@/classes/TableOfContentsEntry'
import { inject, InjectionKey } from 'vue'

export const MarkdownProcessorKey: InjectionKey<IMarkdownProcessor> = Symbol('IMarkdownProcessor')

export interface IMarkdownProcessor {
  content: string | null
  mainHeading: string | null
  tableOfContents: Array<TableOfContentsEntry>
  process: (markdown: string) => void
}

export function useMarkdownProcessor(): IMarkdownProcessor {
  const resolved = inject(MarkdownProcessorKey)
  if (!resolved) {
    throw new Error(`Could not resolve ${MarkdownProcessorKey.description}`)
  }
  return resolved
}
