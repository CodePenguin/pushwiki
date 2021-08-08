export default interface ISettings {
  defaultPage: string
  title: string
  navigation: {
    links: Array<{
      title: string
      path: string
    }>
  }
  page: {
    sidebar: {
      headerLevels: string
    }
  }
  plugins: {
    youtubeEmbed: boolean
  }
  styles: {
    body: string
    main: string
    navigation: {
      brand: string
      button: string
      header: string
      nav: string
      navLink: string
    }
    page: {
      loading: {
        content: string
      }
      notFound: {
        alert: string
        content: string
      }
      settings: {
        content: string
      }
      wikiPage: {
        article: string
        content: string
        markdown: {
          pre: string
          table: string
        }
        sidebar: {
          li: string
          liNested: string
          nav: string
          navLink: string
          ul: string
          ulNested: string
        }
      }
    }
  }
}
