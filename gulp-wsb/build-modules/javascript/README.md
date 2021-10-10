# JAVASCRIPT MODULE

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  Sourcemaps are created for easier debugging
-  Assets folder can be cleaned before every build
-  A cachebusting file for CSS/JS can be created (here configured for nunjucks)
-  Javascript minification (uglify) can be enabled
-  Different bundles can be created, with their own config (transpilation, source files, output folder)
-  Console logs are being removed from the code during minification
-  A .txt file is created in the project root, with all TODOs and FIXMEs that you create in .js files
-  Humans.txt is being updated on each build
-  A header with developers info can be prepended to JS files (in production environment)

## USAGE

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations. That should be enough for those familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', gulp-babel, gulp-strip-debug, gulp-uglify.

#### Install

```cmd
npm install --save-dev gulp-babel gulp-strip-debug gulp-uglify
```

## Author

[vIGGS](https://www.igorvracar.com)

## License

GNU GENERAL PUBLIC LICENSE
