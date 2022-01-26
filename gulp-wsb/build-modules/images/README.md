# IMAGES MODULE

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar (perhaps not in depth) with the node modules it uses.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  clean output folder before every build
-  keep or remove metadata
-  blurred placeholder SVG, base64 encoded, placed in scss maps, in separate files for large and small placeholders
-  create different image sizes (from one image), compress, crop if required
-  compress images (jpg, png, webp, svg)
-  [humans.txt](https://humanstxt.org/) is being updated on each build

> Read more about SVG placeholders at [css-tricks](https://css-tricks.com/the-blur-up-technique-for-loading-background-images)

## USAGE

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', gulp-svgmin.

#### Install

```cmd
npm install --save-dev sharp gulp-svgmin
```

## Copyright

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

## License

GNU GENERAL PUBLIC LICENSE
