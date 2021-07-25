export default {
  title: "PushWiki",
  navigation: {
    links: []
  },
  page: {
    sidebar: {
      headerLevels: "2-4"
    }
  },
  styles: {
    body: "font-sans font-base font-normal leading-relaxed text-gray-800",
    main: "",
    navigation: {
      brand: "text-xl",
      button: "md:hidden flex items-center px-3 py-2 border rounded text-white p-1 hover:text-black hover:bg-gray-300",
      header: "flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-gray-700 text-white py-4 px-4 relative",
      nav: "absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-gray-100 shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0",
      navLink: "block py-1 hover:underline text-gray-600 md:text-white"
    },
    page: {
      loading: {
        content: ""
      },
      notFound: {
        alert: "bg-gray-100 border-black p-4 rounded",
        content: "p-4 prose prose-blue"
      },
      wikiPage: {
        article: "md:col-span-9 xl:col-span-10 prose prose-blue p-4",
        content: "grid md:grid-cols-12",
        markdown: {
          pre: "border p-1",
          table: "table-auto"
        },
        sidebar: {
          nav: "px-6 py-5 md:col-span-3 xl:col-span-2 bg-gray-100 m-3 rounded border border-gray-300 md:m-0X md:rounded-noneX",
          navLink: "block hover:underline text-lg mb-2",
          childNav: "pl-6"
        }
      }
    }
  }
}