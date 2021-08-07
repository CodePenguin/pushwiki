export function scrollToHash(hash: string): void {
  const header = document.querySelector<HTMLElement>('header')
  if (header == null) return
  const headerStyles = getComputedStyle(header)
  const isHeaderSticky = headerStyles.position === 'sticky' || headerStyles.position === 'fixed'
  const offset = isHeaderSticky ? header.clientHeight : 0
  const element = document.querySelector<HTMLElement>(hash)
  if (element == null) return
  window.scroll({ top: element.offsetTop - offset, left: 0, behavior: 'auto' })
}
