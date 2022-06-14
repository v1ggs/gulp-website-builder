# IMAGES MODULE

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
-  keep or remove metadata
-  :information_source: blurred placeholder SVG, base64 encoded, placed in scss maps, in separate files for large and small placeholders
-  create different image sizes (from one image)
-  compress and/or crop images (jpg, png, webp, svg)
-  [humans.txt](https://humanstxt.org/) is being updated on each build

> :information_source: Read more about SVG placeholders at [css-tricks](https://css-tricks.com/the-blur-up-technique-for-loading-background-images)

## USAGE

-  Edit configuration
-  Run gulp
-  Place files in their src dir, they will be processed automatically

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

---

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', gulp-svgmin.

#### Install

```cmd
npm install --save-dev sharp gulp-svgmin
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

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

---
