# GULP WEBSITE BUILDER

> **_For Gulp 4, tested on Windows_**

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> If you're familiar with Gulp and JavaScript then it's very easy for you to add new modules or modify modules behaviour.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

---

> Browserslistrc file (.browserslistrc) is not used, because babel (for JS) has two different transpilations, whose settings are different from those for autoprefixer.

---

> Use TODOs like: `TODO:` or `FIXME:` in an appropriate comment.
> Read more at: <https://www.npmjs.com/package/gulp-todo>

## FEATURES

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations. That should be enough for those familiar with Gulp and JavaScript.

### Gulp

-  watch for file changes and run the appropriate task on ach file change (save, delete, new file)
-  restart gulp on any config change and apply new settings
-  tasks don't break on plugin errors (gulp-plumber)
-  web server with streaming CSS files on change, and reloading page on HTML and JS change

### Common

-  process Nunjucks, SCSS, JavaSript, images, minify and inline svg, create svg sprites
-  copy (to assets) files that don't have to be processed, e.g. fonts, sounds... so all source files can be in one place (in src dir)
-  sourcemaps (SCSS and JS)
-  create humans.txt file
-  notification on plugin errors (so you don't have to keep the console open)
-  sound on task completion (so you don't have to keep the console open)

### Nunjucks

-  configure global variables and filters for usage in .njk files
-  format output HTML
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  humans.txt is being updated on each build

> Always build html after having finished bulding CSS and Javascript, to update their cachebust in HTML (e.g. src:"/main.js?20211010212110").
> Activating watcher for this (JSON) file is probably not a good idea, because it would build HTML on any change in JavaScript and SCSS files.

### SCSS

-  clean output folder before every build
-  sourcemaps
-  choose what comments to keep in non-minified files (minifier removes them all)
-  prefix CSS with autoprefixer
-  format CSS
-  remove unused selectors from CSS (purgeCss)
-  get removed selectors from CSS in a .rejected.css (purgeCss)
-  group media queries in CSS
-  fix flex bugs <https://github.com/philipwalton/flexbugs>
-  minify and inline svg files <https://www.npmjs.com/package/postcss-inline-svg>
-  doiuse .txt file in the root, with CSS features that are not supported by certain browsers
-  minify with CSSO
-  cachebusting (JSON file for usage with HTML processor)
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  add developer info (in a comment) at the top of CSS files (in 'prod' environment)
-  humans.txt is being updated on each build

### JavaScript

-  clean output folder before every build
-  multiple bundles can be created, with multiple transpilations for each
-  different output folder can be set for each bundle
-  sourcemaps
-  cachebusting (JSON file for usage with HTML processor)
-  minification [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
-  console logs are being removed from the code during minification
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  add developer info (in a comment) at the top of JS bundles (in 'prod' environment)
-  humans.txt is being updated on each build

### Images

-  clean output folder before every build
-  keep or remove metadata
-  blurred placeholder SVG, base64 encoded, placed in scss variables (\_placeholders.scss)
-  create different image sizes (from one image), compress, crop if required
-  compress images (jpg, png, webp, svg)
-  humans.txt is being updated on each build

> Read more about SVG placeholders at <https://css-tricks.com/the-blur-up-technique-for-loading-background-images/>

### SVG Sprites

-  set folders whose content (SVG files) will be merged into a 'sprite'
-  create multiple sprites
-  minify SVGs

> Read more about SVG sprites at <https://css-tricks.com/svg-symbol-good-choice-icons/>

### File Copy

-  clean output folders before every copy
-  set array of folders in the 'src' folder to copy files without processing them

## INSTALLATION

> If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be compatible with gulp-sourcemaps.
> [Plugins with gulp sourcemaps support](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support)

Place this repository in your project root directory. File/folder structure should be like this (with default config):

-  .git
-  .vscode
-  htdocs (will be created)
   -  assets
   -  humans.txt
   -  ... (other files/folders)
-  gulp-wsb
   -  build-modules
   -  common-fn
   -  index.js
   -  project-config.js
-  src
   -  img
   -  js
   -  nunjucks
   -  scss
   -  ... (other files/folders)
-  gulpfile.js
-  LICENSE
-  README.md

### Gulp-cli has to be installed globally

```cmd
npm install --global gulp-cli
```

### General Node Modules

```cmd
npm install --save-dev gulp, gulp-plumber, del, gulp-rename, gulp-sourcemaps, gulp-concat, gulp-if, gulp-header, gulp-todo, merge2, browser-sync, gulp-notify
```

### All other Node Modules

```cmd
npm install --save-dev gulp-nunjucks-render gulp-jsbeautifier sass gulp-sass postcss gulp-postcss postcss-flexbugs-fixes postcss-inline-svg postcss-svgo autoprefixer postcss-discard-comments postcss-sort-media-queries doiuse postcss-csso @fullhuman/postcss-purgecss gulp-purgecss gulp-babel gulp-strip-debug gulp-uglify sharp gulp-svgmin gulp-svgstore
```

It's understood that you navigate in your console where you want to install node_modules.

> Each module's README file contains all node modules required for it.

### Add/remove a module

It is possible to remove modules that are not required (just delete the folder).

It is also possible to add your own module for a specific language:

-  Create a folder in `build-modules` folder (name it by the language/technology)
-  Use existing files from other modules as an example for how to create config and index files
-  Include this new module in the main index file (next to `project-config.js`), in the 'M O D U L E S' section (search for 'ADD ALL MODULES HERE'), and create a watcher, if required.

## USAGE

> **_Default config should be good for many users. Only source files/folders have to be modified._**

1. Use project config:

   -  Set basic project info in `config-project.js`
   -  Set development environment in `config.build.env: 'dev'`
   -  `config.build.type` configures output folder (for server and assets links )
   -  set main directories in `config.dirname` (folder name, not path)
   -  set source directories `const dirs` (path)
   -  set specific files `const files` (path)

2. Configure each module's in its configuration file.

3. Import in `gulpfile.js` (already done) like:

   ```javascript
   const gwsb = require("./gulp-wsb");
   ```

4. Set `run` task as default, like:

   ```javascript
   exports.default = gwsb.run;
   ```

That's all.
Now just navigate in your console to your project folder and type 'gulp'.
On every config change the gulp process will restart and apply the new config.

If you rename the `gulp-wsb` folder, just replace it in `gulpfile.js`, that's all. Use provided `gulpfile.js` as an example.
All found modules are imported automatically.

Each module has a README with usage information.

> Configuration files (`config.js`) are commented for explanations. That should be enough for those familiar with Gulp and JavaScript.

## Copyright

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

## License

GNU GENERAL PUBLIC LICENSE
