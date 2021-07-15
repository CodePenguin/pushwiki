# Settings

The "pushwiki.json" file allows you to change various aspects of PushWiki.

For CSS classes, refer to the [Bootstrap documentation](https://getbootstrap.com/docs/5.0/content/tables/).

## Base Settings

| Property name | Description |
| ------------- | ----------- |
| title | The name used in the branding of the PushWiki instance. |
| navigation | An object to configure navigation settings.  See the Navigation section below. |

## Markdown

| Property name | Description |
| ------------- | ----------- |
| preClasses | A list of CSS classes that will be applied to pre elements.  (Default: border p-1) |
| tableClasses | A list of CSS classes that will be applied to tables. See [Bootstrap Tables](https://getbootstrap.com/docs/5.0/content/tables/). |


## Navigation

| Property name | Description |
| ------------- | ----------- |
| links | An array of link objects that define the navigation links. |
| navbarClasses | A list of CSS classes that will be applied to the Navbar for extra styling.  (Default: navbar-dark bg-primary) See [Bootstrap Navbar Color Schemes](https://getbootstrap.com/docs/5.0/components/navbar/#color-schemes). |

### Navigation Links

| Property name | Description |
| ------------- | ----------- |
| title | The title of the link that will be displayed. |
| path | The path to the desired wiki page excluding the ".md" extension.  If the page is "docs/settings.md", the path would be just "docs/settings". |
