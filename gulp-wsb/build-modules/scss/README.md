# SCSS MODULE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  clean output folder before every build
-  [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
-  minification (csso)
-  choose what comments to keep in minified files
-  prefix CSS with [autoprefixer](https://www.npmjs.com/package/autoprefixer)
-  format CSS
-  remove unused selectors from CSS ([purgeCss](https://www.npmjs.com/package/gulp-purgecss))
-  get removed selectors from CSS in a .rejected.css ([purgeCss](https://www.npmjs.com/package/gulp-purgecss))
-  group media queries in CSS, depending on your design way (mobile/desktop first)
-  [fix flex bugs](https://github.com/philipwalton/flexbugs)
-  [minify and inline svg files](https://www.npmjs.com/package/postcss-inline-svg)
-  [doiuse](https://www.npmjs.com/package/doiuse) .txt file in the root, with CSS features that are not supported by certain browsers
-  minify with CSSO
-  cachebusting (JSON file for usage with HTML processor)
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  add developer or license info at the top of CSS files (in 'prod' environment)
-  [humans.txt](https://humanstxt.org/) is being updated on each build

> If the CSS does not work, check purgeCSS rejected file, to see if the selector has been removed.
> It happens with selectors dinamically created with Javascript - e.g. element.classlist.add(someVar + '--some-modifier').
> Such selectors [purgeCss](https://www.npmjs.com/package/gulp-purgecss) can't see.
> Use SCSS config to add selectors that should always be kept.

## USAGE

> Everything is configurable.
> If using purgeCss, it is a good idea to use the processed (and minified) stylesheet in the development, to make sure it works. Sometimes certain selectors can be removed without your knowledge.

---

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

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
