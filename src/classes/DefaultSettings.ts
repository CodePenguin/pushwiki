import ISettings from '@/interfaces/ISettings'

const defaultSettings: ISettings = {
  defaultPage: 'index',
  title: 'PushWiki',
  navigation: {
    links: []
  },
  page: {
    sidebar: {
      headerLevels: '2-4'
    }
  },
  plugins: {
    youtubeEmbed: true
  },
  styles: {
    body: 'font-sans font-base font-normal leading-relaxed text-gray-800',
    main: '',
    navigation: {
      brand: 'text-xl',
      button: 'md:hidden flex items-center px-3 py-2 border rounded text-white p-1 hover:text-black hover:bg-gray-300',
      header: 'flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-gray-700 text-white py-4 px-4 relative md:sticky top-0 z-50',
      nav: 'absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-gray-100 shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0',
      navLink: 'block py-1 hover:underline text-gray-600 md:text-white'
    },
    page: {
      loading: {
        content: ''
      },
      notFound: {
        alert: 'bg-gray-100 border-black p-4 rounded',
        content: 'p-4 prose max-w-none prose-blue'
      },
      settings: {
        content: 'p-4 prose max-w-none prose-blue'
      },
      wikiPage: {
        article: 'md:col-span-9 xl:col-span-10 prose max-w-none prose-blue p-4',
        content: 'md:grid md:grid-cols-12',
        markdown: {
          pre: 'border p-1',
          table: 'table-auto'
        },
        sidebar: {
          li: 'mb-2',
          liNested: 'mb-2',
          nav: 'md:col-span-3 xl:col-span-2',
          navLink: 'hover:underline text-lg',
          ul: 'px-6 py-5 m-3 bg-gray-100 border border-gray-300 rounded md:sticky md:top-20',
          ulNested: 'pl-6'
        }
      }
    }
  }
}
export default defaultSettings
