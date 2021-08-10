export interface IMarkdownProcessorPlugin {
  beforeProcess?(): void
  link?(href: string | null, title: string | null, text: string): boolean | string
  afterProcess?(): void
}
