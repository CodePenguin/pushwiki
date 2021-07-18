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
    main: "container-fluid",
    navigation: {
      navbar: "navbar-dark bg-primary"
    },
    page: {
      content: "col p-3",
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