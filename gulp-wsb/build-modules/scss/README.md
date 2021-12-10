# SCSS MODULE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  [Sourcemaps](npmjs.com/package/gulp-sourcemaps) are created for easier debugging
-  Assets folder can be cleaned before every build
-  It can be configured what css comments to keep, only in the non-minified file
-  [Autoprefixer](https://www.npmjs.com/package/autoprefixer) is being used for necessary vendor prefixes
-  It is possible to purge the processed CSS and remove unused selectors ([purgeCss](https://www.npmjs.com/package/gulp-purgecss))
-  When purging css, it produces a .rejected.css file to show what has been removed
-  It's possible to group and sort media queries
-  It's possible to [fix flex bugs](https://github.com/philipwalton/flexbugs)
-  CSS minification (csso) can be enabled, it always removes all css comments
-  A cachebusting file for CSS/JS can be created (here configured for nunjucks)
-  It's possible to [inline svg images](https://www.npmjs.com/package/postcss-inline-svg) into CSS and minify them there, svg minifier uses default preset
-  Doiuse info provided in console and in a .txt file with all used css features that are not supported by certain browsers
-  A .txt file is created in the project root, with all TODOs and FIXMEs that you create in .scss files
-  [Humans.txt](https://humanstxt.org/) is being updated on each build
-  A header with developer or license info can be prepended to CSS files (in 'prod' environment)

> If the CSS does not work, check purgeCSS rejected file, to see if the selector has been removed.
> It happens with selectors dinamically created with Javascript - e.g. element.classlist.add(someVar + '--some-modifier').
> Such selectors [purgeCss](https://www.npmjs.com/package/gulp-purgecss) can't see.
> Use SCSS config to add selectors that should always be kept.

## USAGE

> Everything is configurable.
> If using purgeCss, it is a good idea to use the processed (and minified) stylesheet in the development, to make sure it works. Sometimes certain selectors can be removed without your knowledge.

---

> Configuration files (`config.js`) are commented for explanations, which should be enough for those familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', sass, gulp-sass, postcss, gulp-postcss, postcss-flexbugs-fixes, postcss-inline-svg, postcss-svgo, autoprefixer, postcss-discard-comments, postcss-sort-media-queries, doiuse, postcss-csso, @fullhuman/postcss-purgecss, gulp-purgecss.

#### Install

```cmd
npm install --save-dev sass gulp-sass postcss gulp-postcss postcss-flexbugs-fixes postcss-inline-svg postcss-svgo autoprefixer postcss-discard-comments postcss-sort-media-queries doiuse postcss-csso @fullhuman/postcss-purgecss gulp-purgecss
```

> If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be compatible with gulp-sourcemaps.
> [Plugins with gulp sourcemaps support](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support)

## Copyright

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

## License

GNU GENERAL PUBLIC LICENSE
