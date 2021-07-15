# Settings

The "pushwiki.json" file allows you to change various aspects of PushWiki.

## Base Settings

| Property name | Description |
| ------------- | ----------- |
| title | The name used in the branding of the PushWiki instance. |
| navigation | An object to configure navigation settings.  See the Navigation section below. |

## Markdown

| Property name | Description |
| ------------- | ----------- |
| tableClasses | A list of [Bootstrap Classes](https://getbootstrap.com/docs/5.0/content/tables/) that will be applied to tables.  (Default: table) |


## Navigation

| Property name | Description |
| ------------- | ----------- |
| links | An array of link objects that define the navigation links. |
| navbarClasses | A list of [Bootstrap Classes](https://getbootstrap.com/docs/5.0/components/navbar/#color-schemes) that will be applied to the Navbar for extra styling.  (Default: navbar-dark bg-primary) |

### Navigation Links

| Property name | Description |
| ------------- | ----------- |
| title | The title of the link that will be displayed. |
| path | The path to the desired wiki page excluding the ".md" extension.  If the page is "docs/settings.md", the path would be just "docs/settings". |
