# GULP WEBSITE BUILDER

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

---

## TABLE OF CONTENTS

- [GENERAL INFO](#general-info)
- [FEATURES](#features)
  - [General](#general)
  - [Gulp](#gulp)
  - [Wordpress](#wordpress)
  - [Nunjucks](#nunjucks)
  - [SCSS](#scss)
  - [JavaScript](#javascript)
  - [Images](#images)
  - [SVG Sprites](#svg-sprites)
  - [File Copy](#file-copy)
- [USAGE](#usage)
- [INSTALLATION](#installation)
- [LICENSE](#license)
- [COPYRIGHT](#copyright)

---

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar with the node modules it uses.
>
> If you're familiar with Gulp and JavaScript then it's very easy for you to add new modules or modify modules behaviour.
>
> Try not to modify any other but `config.js` files, unless you know what you are doing.
>
> Configuration files (`config.js`) are commented for explanations. Almost everything is configurable.
>
> If you're developing with WordPress, you have to have a local WordPress site (with a local server, like XAMPP) to proxy it with browsersync, because browsersync can't serve php. The settings for that are made automatically, just edit the project and wp config.
>
> If you want to use https on the local server, use [mkcert](https://mkcert.org/).
>
> Use TODOs like: `TODO:` or `FIXME:` in an appropriate comment (ex: // TODO: change this), to get all todos and fixmes in a .txt file in the ".log/" dir.\
> Read more at: <https://www.npmjs.com/package/gulp-todo>

---

## FEATURES

### General

- :information_source: [easily add or remove modules](#addremove-a-module) (add your HTML processor instead of nunjucks)
- develop a static page or for wordpress
- option to proxy a domain (e.g. from local server), when working with php/wordpress
- option to use https on the local server (you have to [make the keys](https://mkcert.org/))
- 'dev' and 'prod' mode: control developer headers for css and js, sourcemaps, js console logs, doiuse and todo logs
- process Nunjucks (:information_source:), SCSS, JavaSript, images, minify and inline svg in css, create svg sprites
- copy (to assets) files that don't have to be processed, e.g. fonts, sounds... so all source files can be in one place
- sourcemaps for SCSS and JS
- create [humans.txt](https://humanstxt.org/) file
- :information_source: :information_source: notification on plugin errors (so you don't have to keep the console open)
- sound on task completion (so you don't have to keep the console open)

> :information_source: It is easy to add your HTML preprocessor, see [Add your HTML preprocessor in three steps](#add-your-html-preprocessor-in-three-steps)
>
> :information_source: :information_source: Windows 10 Note:\
> You might have to activate banner notification for the toast to show. You can make it work by going to System > Notifications & Actions. The 'toast' app needs to have Banners enabled. (You can activate banners by clicking on the 'toast' app and setting the 'Show notification banners' to On)

### Gulp

- watch for file changes and run the appropriate task on each file change (save, delete, new file)
- restart gulp on any config change and apply new settings
- tasks don't break on plugin errors ([gulp-plumber](https://www.npmjs.com/package/gulp-plumber))
- web server
  - stream CSS files on change
  - reload a page on HTML and JS change
  - proxy a domain for php/wordpress development

### Wordpress

- :information_source: unzip automatically [underscores theme template](https://underscores.me)
- :information_source: :information_source: replace placeholder slug and text-domain automatically, in all files, if using a "placeholder" theme
- theme is initialised automatically:
  - directory
  - style.css
  - index.php
  - screenshot placeholder
- copy files to the destination on any file change
- populate all TODOs and FIXMEs from .php files into LOG-TODO-WP.txt, in the ".log/" dir
- update [humans.txt](https://humanstxt.org/) on each build

> This may look like an ordinary duplication of files, but I believe it's better to keep all source files in one place.
>
> :information_source: If you want to use underscores starter theme, then download it first, place it into the wordpress source dir, make all required configurations, and then run gulp. It will be unzipped and all config done automatically.
>
> :information_source: :information_source: Placeholder theme would be a theme that is created once, and used for all projects, with some particular name, which is used as theme slug and text domain placeholder which is easy to replace whithout errors.\
> It is always a good idea to download a new starter theme for each new project, because they maintain (update) it.

### Nunjucks

- configure global variables and filters for usage in .njk files
- format output HTML
- change output file extension (e.g. "php")
- a TODO file (.txt) with all todos and fixmes in the ".log/" dir
- [Humans.txt](https://humanstxt.org/) is being updated on each build

> :warning: Always build html before publishing it and after having finished bulding CSS and Javascript, to update their cachebust in HTML (e.g. src:"/main.js?20211010212110").\
> Activating watcher for this (JSON) cachebust file is probably not a good idea, because it would build HTML on any change in JavaScript and SCSS files.
>
> :information_source: It is easy to add your HTML preprocessor, see [Add your HTML preprocessor in three steps](#add-your-html-preprocessor-in-three-steps)

### SCSS

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

> :warning: If the CSS does not work, check purgeCSS rejected file, to see if the selector has been removed. It happens with selectors dinamically created with Javascript - e.g. element.classlist.add(someVar + '--some-modifier'). Such selectors [purgeCss](https://www.npmjs.com/package/gulp-purgecss) can't see. Use SCSS config to add selectors that should always be kept.\
> If using purgeCss, it is a good idea to use the processed stylesheet in the development, to make sure it works. Sometimes certain selectors can be removed without your knowledge.

### JavaScript

- clean output folder (delete all built files) before every build
- multiple bundles can be created, with multiple transpilations for each (target browsers configuration for babel)
- choose for each bundle what comments to keep in minified files
- different output folder can be set for each bundle
- [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- cachebusting (JSON file for usage with HTML processor)
- minification with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- console logs are being removed from the code during minification, in 'prod' environment
- a TODO file (.txt) with all todos and fixmes in the ".log/" dir
- add developer or license info at the top of JS bundles, in 'prod' environment
- [humans.txt](https://humanstxt.org/) is being updated on each build

### Images

- clean output folder (delete all built files) before every build
- keep or remove metadata
- :information_source: blurred placeholder SVG, base64 encoded, placed in scss maps, in two separate files: for large and small placeholders
- create different image sizes from one image
- compress and/or crop images (jpg, png, webp, svg)
- [humans.txt](https://humanstxt.org/) is being updated on each build

> :information_source: Read about the implemented technique at [css-tricks](https://css-tricks.com/the-blur-up-technique-for-loading-background-images)

### SVG Sprites

- set folders whose content (SVG files) will be merged into a 'sprite'
- create multiple sprites, with different options for each
- minify SVGs
- option to keep/remove doctype
- prefixed IDs are automatically generated, using sprite name, dir name and filename, so files with the same filenames (in different directories) are possible, IDs will stil be unique

> :information_source: Inline SVGs in browser, not with Gulp, because of caching.
>
> :information_source: Read more about SVG sprites at [css-tricks](https://css-tricks.com/svg-symbol-good-choice-icons/)

### File Copy

- clean output folders before every copy
- set array of folders in the 'src' folder to copy files without processing them

---

## USAGE

> **Default config should be fine for most users. To start, configure project-config.js and source files/folders for each module (in config.js files).**
>
> Configuration files (`config.js`) are commented for explanations.

1. Use project config:

   - Set basic project info in `config-project.js`
   - Set development environment in `config.build.env: 'dev'`
   - Set design type in `config.build.type`, static or wordpress - this configures the server and assets folder/links
   - If you work with php/wordpress, set proxy to the local domain
   - If you want to use https in the development, set key and cert (paths to keys)
   - Set main folder names (not path) in `config.dirname`
   - Set source directories (path) in `const dirs`
   - Set specific files (cachebust, img placeholders) in `const files` (path)

2. Configure each module's config in its configuration file.

3. The `gulpfile.js` file is already set:

   ```javascript
   const gwsb = require('./.gulp-wsb');
   exports.default = gwsb.run;
   ```

That's all.

If you are using underscores theme, place its zip file in the wp source dir for it to be unzipped automatically.\
Now just navigate in your console to your project folder and type 'gulp'.

On every gulp config change, the gulp process will restart and apply the new config.

If you rename the `.gulp-wsb` folder, just rename it in `gulpfile.js` as well.

All found modules are imported automatically. The missing ones will not cause error, only will display an info in console, that the module was not found.

Each module has a README with usage information.

---

## INSTALLATION

> :warning: If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be [compatible with gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support).

Place this repository in your project root directory. File/folder structure should be something like this (with default config):

- .git
- **.gulp-wsb <==============**
- htdocs (or public_html etc., depending on your config, will be created and named from the config)
  - assets
  - humans.txt
  - ... (other files/folders)
  - build-modules
  - common-fn
  - index.js
  - project-config.js
- node_modules
- src
  - img
  - js
  - nunjucks
  - scss
  - ... (other files/folders)
- **gulpfile.js**
- **LICENSE**
- **package.json**
- **package-lock.json**
- **README.md**

### Gulp-cli has to be installed globally

```cmd
npm install --global gulp-cli
```

### Install required modules

Navigate in your console to the project root directory and type:

```cmd
npm install
```

### Add/remove a gulp-wsb module

It is possible to remove modules that are not required (just delete the folder).

It is also possible to add your own module for a specific language:

- Create a folder in "build-modules" folder (name it by the language/technology)
- Use existing files from other modules as an example for how to create config and index files
- Include this new module in the main `index.js` file (next to `project-config.js`), in the 'M O D U L E S' section (search for 'ADD ALL MODULES HERE'), and create a watcher, if required.

### Add your HTML preprocessor in three steps

1. Create a new module (by copying the existing nunjucks module) and rename it
2. Require your preprocessor at the top of the `index.js` file, in:
   "const htmlProcessor = require('gulp-nunjucks-render');"
3. In `config.js` file: remove "const manageEnvironment" and modify "const config" object

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

### **?? 2021 [Igor Vra??ar](https://www.igorvracar.com)**

---
