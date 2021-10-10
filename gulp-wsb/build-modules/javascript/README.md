# JAVASCRIPT MODULE

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

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
