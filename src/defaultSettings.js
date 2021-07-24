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
      brand: "block h-6 md:h-",
      button: "md:hidden flex items-center px-3 py-2 border rounded bg-blue-900 text-white p-1 hover:text-black hover:bg-gray-200",
      header: "flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-blue-900 text-white py-4 px-4 relative",
      nav: "absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-gray-100 shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0",
      navLink: "block py-1 hover:underline text-gray-600 md:text-white"
    },
    page: {
      article: "md:col-span-9 prose p-4 bg-green-100",
      leftSidebar: {
        nav: "px-3 py-3 md:col-span-3 bg-gray-100",
        navLink: "",
        childNav: "pl-10"
      },
      markdown: {
        pre: "border p-1",
        table: "table-auto"
      },
      pageLoading: "",
      pageNotFound: "",
      wikiPage: "grid md:grid-cols-12 border-2 border-red-600"
    }
  }
}