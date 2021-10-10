# SCSS MODULE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  Sourcemaps are created for easier debugging
-  Assets folder can be cleaned before every build
-  It can be configured what css comments to keep, only in the non-minified file
-  Autoprefixer is being used for necessary vendor prefixes
-  It is possible to purge the processed CSS and remove unused selectors
-  When purging css, it produces a .rejected.css file to show what has been removed
-  It's possible to group and sort media queries
-  It's possible to fix flex bugs (https://github.com/philipwalton/flexbugs)
-  CSS minification (csso) can be enabled, it always removes all css comments
-  A cachebusting file for CSS/JS can be created (here configured for nunjucks)
-  It's possible to inline svg images into CSS and minify them there (see https://www.npmjs.com/package/postcss-inline-svg for usage), svg minifyer uses default preset
-  Doiuse info provided in console and in a .txt file with all used css features that are not supported by certain browsers
-  A .txt file is created in the project root, with all TODOs and FIXMEs that you create in .scss files
-  Humans.txt is being updated on each build
-  A header with developers info can be prepended to CSS files (in production environment)

## USAGE

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations. That should be enough for those familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', sass, gulp-sass, postcss, gulp-postcss, postcss-flexbugs-fixes, postcss-inline-svg, postcss-svgo, autoprefixer, postcss-discard-comments, postcss-sort-media-queries, doiuse, postcss-csso, @fullhuman/postcss-purgecss, gulp-purgecss.

#### Install

```cmd
npm install --save-dev sass gulp-sass postcss gulp-postcss postcss-flexbugs-fixes postcss-inline-svg postcss-svgo autoprefixer postcss-discard-comments postcss-sort-media-queries doiuse postcss-csso @fullhuman/postcss-purgecss gulp-purgecss
```

## Author

[vIGGS](https://www.igorvracar.com)

## License

GNU GENERAL PUBLIC LICENSE
