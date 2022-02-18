# GULP WEBSITE BUILDER

---

> **_FOR GULP 4_**

---

> **_TESTED ON WINDOWS - NODE.JS 14_**

---

## GNU GENERAL PUBLIC LICENSE

> **_YOU DO NOT HAVE TO LICENSE SITES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE._**
> THIS LICENSE IS FOR DERIVATIVE SOFTWARE, LIKE A MODIFIED VERSION OF THIS SOFTWARE OR A SOFTWARE THAT INCLUDES THIS CODE OR ITS PARTS.

---

## TABLE OF CONTENTS

-  [GENERAL INFO](#general-info)
-  [FEATURES](#features)
   -  [General](#general)
   -  [Gulp](#gulp)
   -  [Wordpress](#wordpress)
   -  [Nunjucks](#nunjucks)
   -  [SCSS](#scss)
   -  [JavaScript](#javascript)
   -  [Images](#images)
   -  [SVG Sprites](#svg-sprites)
   -  [File Copy](#file-copy)
-  [INSTALLATION](#installation)
-  [USAGE](#usage)
-  [COPYRIGHT](#copyright)
-  [LICENSE](#license)

---

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar with the node modules it uses.

---

> If you're familiar with Gulp and JavaScript then it's very easy for you to add new modules or modify modules behaviour.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

---

> If you're developing with WordPress, you have to have a local WordPress site (with local server, like XAMPP) to proxy it with browsersync, because browsersync can't serve php. The settings for that are made automatically, just edit the project and wp config.

---

> Browserslistrc file (.browserslistrc) is not used, because babel (for JS) can have different transpilations, whose settings can be different from those for autoprefixer.

---

> Use TODOs like: `TODO:` or `FIXME:` in an appropriate comment, to get all todos and fixmes in a .txt file in the root dir
> Read more at: <https://www.npmjs.com/package/gulp-todo>

---

## FEATURES

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

---

> Almost everything is configurable.

### General

-  [easily add or remove modules](#addremove-a-module) (add your HTML processor instead of nunjucks)
-  possibility to proxy a domain (e.g. from local server), when working with php/wordpress (config-project.js > config.build.type 'wp')
-  develop a static page (config-project.js > config.build.type 'static') or with wordpress (config-project.js > config.build.type 'wp') - wp theme is initialised automatically - directory, index.php, screenshot and style.css
-  process Nunjucks, SCSS, JavaSript, images, minify and inline svg, create svg sprites
-  copy (to assets) files that don't have to be processed, e.g. fonts, sounds... so all source files can be in one place (src dir)
-  'dev' and 'prod' mode: control minification, dev headers, sourcemaps, leave/remove js console logs etc.
-  sourcemaps (SCSS and JS)
-  create [humans.txt](https://humanstxt.org/) file
-  notification on plugin errors (so you don't have to keep the console open) (see :information_source: below)
-  sound on task completion (so you don't have to keep the console open)

---

> :information_source: Windows 10 Note:\
> You might have to activate banner notification for the toast to show.\
> You can make it work by going to System > Notifications & Actions. The 'toast' app needs to have Banners enabled. (You can activate banners by clicking on the 'toast' app and setting the 'Show notification banners' to On)

---

### Gulp

-  watch for file changes and run the appropriate task on each file change (save, delete, new file)
-  restart gulp on any config change and apply new settings
-  tasks don't break on plugin errors ([gulp-plumber](https://www.npmjs.com/package/gulp-plumber))
-  web server with streaming CSS files on change, and reloading page on HTML and JS change

### Wordpress

-  unzip automatically [underscores theme template](https://underscores.me)
-  replace placeholder slug and text-domain automatically, in all files, if required
-  theme is initialised automatically - create theme folder, index.php, screenshot placeholder and style.css
-  copy files to the destination on any file change
-  concatenate files (see :information_source: below)
-  populate all TODOs and FIXMEs from .php files into LOG-TODO-WP.txt, in the project root
-  update [humans.txt](https://humanstxt.org/) on each build
-  notification on plugin errors (so you don't have to keep the console open)
-  sound on task completion (so you don't have to keep the console open)

> :information_source: If you have many functions or filters that go into functions.php, that could also be documented (// commented) for usage, potential issues etc., then you can get a very long file, that is difficult to manage. That is the reason I created this option, that at first looks usless with PHP. This way you can split code in smaller files and concatenate them, to avoid unneccessary server side includes.

---

> :warning: **Concatenation removes all occurences of `<?php` and `?>` from each file. They will be prepended/appended to each produced file, which makes this option useful only for files that contain only php code.**

### Nunjucks

-  configure global variables and filters for usage in .njk files
-  format output HTML
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  [Humans.txt](https://humanstxt.org/) is being updated on each build

> Always build html after having finished bulding CSS and Javascript, to update their cachebust in HTML (e.g. src="/main.js?20211010212110").
> Activating watcher for this (JSON) file is probably not a good idea, because it would build HTML on any change in JavaScript and SCSS files.

### SCSS

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

### JavaScript

-  clean output folder before every build
-  multiple bundles can be created, with multiple transpilations for each
-  choose what comments to keep in minified files, for each bundle
-  different output folder can be set for each bundle
-  [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
-  cachebusting (JSON file for usage with HTML processor)
-  minification with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
-  console logs are being removed from the code during minification (in 'prod' environment)
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  add developer or license info at the top of JS bundles (in 'prod' environment)
-  [humans.txt](https://humanstxt.org/) is being updated on each build

### Images

-  clean output folder before every build
-  keep or remove metadata
-  blurred placeholder SVG, base64 encoded, placed in scss maps, in separate files for large and small placeholders
-  create different image sizes (from one image), compress, crop if required
-  compress images (jpg, png, webp, svg)
-  [humans.txt](https://humanstxt.org/) is being updated on each build

> Read more about SVG placeholders at [css-tricks](https://css-tricks.com/the-blur-up-technique-for-loading-background-images)

### SVG Sprites

-  set folders whose content (SVG files) will be merged into a 'sprite'
-  create multiple sprites, with different options
-  minify SVGs
-  option to keep/remove doctype
-  prefixed IDs are automatically generated by sprite name, dir and filename, files with same filenames (in different directories) are possible, IDs will stil be unique

> Inline SVGs in browser, not with Gulp, because of caching.

---

> Read more about SVG sprites at [css-tricks](https://css-tricks.com/svg-symbol-good-choice-icons/)

### File Copy

-  clean output folders before every copy
-  set array of folders in the 'src' folder to copy files without processing them

---

## INSTALLATION

> If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be compatible with gulp-sourcemaps.
> [Plugins with gulp sourcemaps support](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support)

Place this repository in your project root directory. File/folder structure should be like this (with default config):

-  .git
-  .vscode
-  htdocs (will be created and named from the config)
   -  assets
   -  humans.txt
   -  ... (other files/folders)
-  gulp-wsb
   -  build-modules
   -  common-fn
   -  index.js
   -  project-config.js
-  node_modules
-  src
   -  img
   -  js
   -  nunjucks
   -  scss
   -  ... (other files/folders)
-  gulpfile.js
-  LICENSE
-  package.json
-  package-lock.json
-  README.md

### Gulp-cli has to be installed globally

```cmd
npm install --global gulp-cli
```

### General Node Modules

```cmd
npm install --save-dev gulp gulp-plumber adm-zip del gulp-rename gulp-sourcemaps gulp-concat gulp-if gulp-header gulp-todo merge2 sharp browser-sync gulp-notify
```

### All other Node Modules

```cmd
npm install --save-dev gulp-nunjucks-render gulp-jsbeautifier sass gulp-sass gulp-postcss postcss-flexbugs-fixes postcss-inline-svg postcss-svgo autoprefixer postcss-discard-comments postcss-sort-media-queries doiuse postcss-csso @fullhuman/postcss-purgecss gulp-purgecss gulp-babel @babel/core @babel/preset-env gulp-strip-debug gulp-uglify gulp-svgmin gulp-svgstore
```

It's understood that you navigate in your console where you want to install node_modules.

> Each module's README file contains all node modules required for it.

### Add/remove a module

It is possible to remove modules that are not required (just delete the folder).

It is also possible to add your own module for a specific language:

-  Create a folder in `build-modules` folder (name it by the language/technology)
-  Use existing files from other modules as an example for how to create config and index files
-  Include this new module in the main index file (next to `project-config.js`), in the 'M O D U L E S' section (search for 'ADD ALL MODULES HERE'), and create a watcher, if required.

---

## USAGE

> **_Default config should be good for most users. To begin, only project config and source files/folders for each module have to be modified._**

1. Use project config:

   -  Set basic project info in `config-project.js`
   -  Set development environment in `config.build.env: 'dev'`
   -  Set design type in `config.build.type`, static or wordpress - this configures the server and assets folder/links
   -  set main folder names (not path) in `config.dirname`
   -  set source directories (path) in `const dirs`
   -  set specific files (cachebust, img placeholders) in `const files` (path)

2. Configure each module's config in its configuration file.

3. The `gulpfile.js` file is already set:

   ```javascript
   const gwsb = require('./gulp-wsb');
   exports.default = gwsb.run;
   ```

That's all.
Now just navigate in your console to your project folder and type 'gulp'.
On every config change the gulp process will restart and apply the new config.

If you rename the `gulp-wsb` folder, just rename it in `gulpfile.js`, that's all.
All found modules are imported automatically.

Each module has a README with usage information.

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

---

## COPYRIGHT

## **© 2021 [Igor Vračar](https://www.igorvracar.com)**

---

## LICENSE

> **_YOU DO NOT HAVE TO LICENSE SITES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE._**
> THIS LICENSE IS FOR DERIVATIVE SOFTWARE, LIKE A MODIFIED VERSION OF THIS SOFTWARE OR A SOFTWARE THAT INCLUDES THIS CODE OR ITS PARTS.

---

GNU GENERAL PUBLIC LICENSE V3.0

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

Permissions:

-  Commercial use
-  Modification
-  Distribution
-  Patent use
-  Private use

Limitations:

-  No Liability
-  No Warranty

Conditions:

-  License and copyright notice
-  State changes
-  Disclose source
-  Same license

---
