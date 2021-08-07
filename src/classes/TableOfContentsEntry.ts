export default interface TableOfContentsEntry {
  text: string
  level: number
  slug: string
  entries: Array<TableOfContentsEntry>
}
