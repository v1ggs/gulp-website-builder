# SCSS MODULE

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

---

## FEATURES

- clean output folder (delete all built files) before every build
- [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- choose what comments to keep
- prefix CSS with [autoprefixer](https://www.npmjs.com/package/autoprefixer)
- target browsers configuration for [autoprefixer](https://www.npmjs.com/package/autoprefixer) and [doiuse](https://www.npmjs.com/package/doiuse)
- :warning: remove unused selectors from CSS ([purgeCss](https://www.npmjs.com/package/gulp-purgecss))
- get removed selectors from CSS in a .rejected.css ([purgeCss](https://www.npmjs.com/package/gulp-purgecss))
- group media queries in CSS, depending on your design way (mobile/desktop first)
- [fix flex bugs](https://github.com/philipwalton/flexbugs)
- [minify and inline svg files](https://www.npmjs.com/package/postcss-inline-svg)
- [doiuse](https://www.npmjs.com/package/doiuse) .txt file with CSS unsupported features, in the ".log/" dir
- format CSS
- minify with CSSO
- cachebusting (JSON file for usage with HTML processor)
- a TODO file (.txt) with all todos and fixmes in the ".log/" dir
- add developer or license info at the top of CSS files (in 'prod' environment)
- [humans.txt](https://humanstxt.org/) is being updated on each build

> :warning: If the CSS does not work, check purgeCSS rejected file, to see if the selector has been removed. It happens with selectors dinamically created with Javascript - e.g. element.classlist.add(someVar + '--some-modifier'). Such selectors [purgeCss](https://www.npmjs.com/package/gulp-purgecss) can't see. Use SCSS config to add selectors that should always be kept.

---

## USAGE

- place source files in the scss dir in the src folder
- configure all as required in `config.js`
- Use console to navigate to the project root and start gulp

> Configuration files (`config.js`) are commented for explanations.
>
> :warning: If using purgeCss, it is a good idea to use the processed stylesheet in the development, to make sure it works. Sometimes certain selectors can be removed without your knowledge.

---

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', sass, gulp-sass, gulp-postcss, postcss-flexbugs-fixes, postcss-inline-svg, postcss-svgo, autoprefixer, postcss-discard-comments, postcss-sort-media-queries, doiuse, postcss-csso, @fullhuman/postcss-purgecss, gulp-purgecss.

#### Install

```cmd
npm install --save-dev sass gulp-sass gulp-postcss postcss-flexbugs-fixes postcss-inline-svg postcss-svgo autoprefixer postcss-discard-comments postcss-sort-media-queries doiuse postcss-csso @fullhuman/postcss-purgecss gulp-purgecss
```

> :warning: If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be [compatible with gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support).

---

## LICENSE

---

GNU GENERAL PUBLIC LICENSE V3.0

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

Permissions:

- Commercial use
- Modification
- Distribution
- Patent use
- Private use

Limitations:

- No Liability
- No Warranty

Conditions:

- License and copyright notice
- State changes
- Disclose source
- Same license

---

## COPYRIGHT

### **© 2021 [Igor Vračar](https://www.igorvracar.com)**

---
