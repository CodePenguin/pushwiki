export default interface ISettings {
  defaultPage: string
  title: string

  externals: {
    links: Array<{
      crossOrigin: string
      href: string
      integrity: string
      referrerPolicy: string
      rel: string
    }>
    scripts: Array<{
      crossOrigin: string
      referrerPolicy: string
      src: string
    }>
  }

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
    syntaxHighlight: boolean
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
