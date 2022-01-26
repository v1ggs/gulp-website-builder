# JAVASCRIPT MODULE

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

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

## USAGE

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', gulp-babel, gulp-strip-debug, gulp-uglify.

#### Install

```cmd
npm install --save-dev gulp-babel @babel/core @babel/preset-env gulp-strip-debug gulp-uglify
```

> If adding a new plugin in the pipeline, if you're using Sourcemaps, the new plugin has to be compatible with gulp-sourcemaps.
> [Plugins with gulp sourcemaps support](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support)

## Copyright

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

## License

GNU GENERAL PUBLIC LICENSE
