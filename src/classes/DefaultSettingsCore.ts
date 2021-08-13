import ISettings from '@/interfaces/ISettings'

const defaultSettingsCore: ISettings = {
  defaultPage: 'index',
  title: 'PushWiki',
  externals: {
    links: [],
    scripts: []
  },
  navigation: {
    links: []
  },
  page: {
    sidebar: {
      headerLevels: ''
    }
  },
  plugins: {
    syntaxHighlight: false,
    youtubeEmbed: false
  },
  styles: {
    body: '',
    main: '',
    navigation: {
      brand: '',
      button: '',
      header: '',
      nav: '',
      navLink: ''
    },
    page: {
      loading: {
        content: ''
      },
      notFound: {
        alert: '',
        content: ''
      },
      settings: {
        content: ''
      },
      wikiPage: {
        article: '',
        content: '',
        markdown: {
          pre: '',
          table: ''
        },
        sidebar: {
          li: '',
          liNested: '',
          nav: '',
          navLink: '',
          ul: '',
          ulNested: ''
        }
      }
    }
  }
}
export default defaultSettingsCore
