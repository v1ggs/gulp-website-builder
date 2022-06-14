# JAVASCRIPT MODULE

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

---

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar with the node modules it uses.
>
> If you're familiar with Gulp and JavaScript then it's very easy for you to add new modules or modify modules behaviour.
>
> Try not to modify any other but `config.js` files, unless you know what you are doing.
>
> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript. Almost everything is configurable.
>
> If you're developing with WordPress, you have to have a local WordPress site (with local server, like XAMPP) to proxy it with browsersync, because browsersync can't serve php. The settings for that are made automatically, just edit the project and wp config.
>
> Use TODOs like: `TODO:` or `FIXME:` in an appropriate comment (ex: // TODO: change this), to get all todos and fixmes in a .txt file in the root dir.\
> Read more at: <https://www.npmjs.com/package/gulp-todo>

---

## FEATURES

-  clean output folder (delete all built files) before every build
-  multiple bundles can be created, with multiple transpilations for each (target browsers configuration for babel)
-  choose what comments to keep in minified files, for each bundle
-  different output folder can be set for each bundle
-  [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
-  cachebusting (JSON file for usage with HTML processor)
-  minification with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
-  console logs are being removed from the code during minification, in 'prod' environment
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  add developer or license info at the top of JS bundles, in 'prod' environment
-  [humans.txt](https://humanstxt.org/) is being updated on each build

## USAGE

-  place source files in the javascript dir in the src folder
-  configure all as required in `config.js`
-  Use console to navigate to the project root and start gulp

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

---

## INSTALLATION

> :warning: If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be [compatible with gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support).

### Required node modules

Required node modules: 'General Node Modules', gulp-babel, gulp-strip-debug, gulp-uglify.

#### Install

```cmd
npm install --save-dev gulp-babel @babel/core @babel/preset-env gulp-strip-debug gulp-uglify
```

---

## LICENSE

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

## COPYRIGHT

## **© 2021 [Igor Vračar](https://www.igorvracar.com)**

---
