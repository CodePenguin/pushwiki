# PushWiki

PushWiki is a [Markdown](https://guides.github.com/features/mastering-markdown/) based Wiki.
Pages are created using plain Markdown files and are meant to be managed and pushed to a source code repository such as [GitHub](https://github.com/).

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production

#### Full version with all dependencies included
```
yarn build
```

#### Slim version with all dependencies loaded from external CDN
```
yarn build-slim
```

### Docker for development
```
docker-compose up
```

To get setup with a development environment quickly do the following:

* Clone this repo
* Open in Visual Studio Code
* Use the "Docker: Compose Up" command
* Navigate to http://localhost:8080

### Inspirations

* [MDwiki](http://dynalon.github.io/mdwiki/#!index.md)
* [TiddlyWiki](https://tiddlywiki.com/)