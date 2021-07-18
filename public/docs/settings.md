# Settings

The "pushwiki.json" file allows you to change various aspects of PushWiki.

For CSS classes, refer to the [Bootstrap documentation](https://getbootstrap.com/docs/5.0/content/tables/).

## Base Settings

| Property name | Description |
| ------------- | ----------- |
| title | The name used in the branding of the PushWiki instance. |
| navigation | An object to configure navigation settings.  See the Navigation section below. |
| page | An object to configure page settings.  See the Page section below. |
| styles | Provides properties to change the CSS classes that will be applied to various elements. |

## Navigation

| Property name | Description |
| ------------- | ----------- |
| links | An array of link objects that define the navigation links. |
| navbarClasses | A list of CSS classes that will be applied to the Navbar for extra styling.  See [Bootstrap Navbar Color Schemes](https://getbootstrap.com/docs/5.0/components/navbar/#color-schemes). |

### Navigation Links

| Property name | Description |
| ------------- | ----------- |
| title | The title of the link that will be displayed. |
| path | The path to the desired wiki page excluding the ".md" extension.  If the page is "docs/settings.md", the path would be just "docs/settings". |

## Page

| Property name | Description |
| ------------- | ----------- |
| sidebar | An object to configure sidebar settings.  See the Sidebar Settings section below. |

### Sidebar Settings

| Property name | Description |
| ------------- | ----------- |
| headerLevels | A header level or range of header levels that will be included in the table of contents.  For a range, use a dash between the start and end header levels.  Valid header levesl are 1 - 6.  (Single Level: 2, Range: 2-4 ) |

## Styles

| Property name | Description |
| ------------- | ----------- |
| body | A list of CSS classes that will be applied to the document body. |
| main | A list of CSS classes that will be applied to the main content. This is the parent of the sidebar and page content. |
| markdown | An object representing styles related to the markdown content. |
| navigation | An object representing styles related to the navigation content. |
| page | A list of CSS classes that will be applied to the page content. |

### Markdown Styles

| Property name | Description |
| ------------- | ----------- |
| pre | A list of CSS classes that will be applied to pre elements. |
| table | A list of CSS classes that will be applied to tables. See [Bootstrap Tables](https://getbootstrap.com/docs/5.0/content/tables/). |

### Navigation Styles

| Property name | Description |
| ------------- | ----------- |
| navbar | A list of CSS classes that will be applied to navbar. |

### Page Styles

| Property name | Description |
| ------------- | ----------- |
| article | A list of CSS classes that will be applied to the article elements representing the page content. |
| leftSidebar | An object representing styles related to the left side bar.  See the Sidebar Styles section. |

#### Sidebar Styles

| Property name | Description |
| ------------- | ----------- |
| nav | A list of CSS classes that will be applied to the nav elements of a sidebar. |
| childNav | A list of CSS classes that will be applied to any nested nav elements of a sidebar.  |
