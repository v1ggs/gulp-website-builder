# IMAGES MODULE

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  clean output folder before every build
-  keep or remove metadata
-  blurred placeholder SVG, base64 encoded, placed in scss variables (\_placeholders.scss)
-  create different image sizes, compress, crop if required
-  compress images (jpg, png, webp, svg)
-  humans.txt is being updated on each build

> Read more about SVG placeholders at <https://css-tricks.com/the-blur-up-technique-for-loading-background-images/>

## USAGE

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations. That should be enough for those familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', sharp, gulp-svgmin.

#### Install

```cmd
npm install --save-dev sharp gulp-svgmin
```

## Author

[vIGGS](https://www.igorvracar.com)

## License

GNU GENERAL PUBLIC LICENSE
