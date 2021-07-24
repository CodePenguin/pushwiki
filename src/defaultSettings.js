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
    main: "container-fluid mt-5 pt-3",
    navigation: {
      button: "md:hidden flex items-center px-3 py-2 border rounded bg-blue-900 text-white p-1 hover:text-black hover:bg-gray-200",
      brand: "block h-6 md:h-",
      header: "flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-blue-900 text-white py-4 px-4 relative",
      nav: "absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-gray-100 shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0",
      navLink: "block py-1 hover:underline text-gray-600 md:text-white"
    },
    page: {
      article: "col p-3 prose",
      markdown: {
        pre: "border p-1",
        table: "table"
      },
      leftSidebar: {
        nav: "nav-pills col-md-4 col-lg-3 d-block bg-light nav nav-pills flex-column p-3 ps-0",
        childNav: "nav-pills flex-column ms-3",
      }
    }
  }
}