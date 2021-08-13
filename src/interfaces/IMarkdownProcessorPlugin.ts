export interface IMarkdownProcessorPlugin {
  beforeProcess?(): void
  code?(code: string, infostring: string | undefined, isEscaped: boolean): boolean | string
  link?(href: string | null, title: string | null, text: string): boolean | string
  afterProcess?(): void
}
