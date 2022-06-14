# NUNJUCKS MODULE

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

> **YOU DO NOT HAVE TO LICENSE SITES OR THEMES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE.**
>
> THIS LICENSE IS FOR DERIVATIVE SOFTWARE, LIKE A MODIFIED VERSION OF THIS SOFTWARE OR A SOFTWARE THAT INCLUDES THIS CODE OR ITS PARTS.

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

-  configure global variables and filters for usage in .njk files
-  format output HTML
-  change output file extension
-  a TODO file (.txt) with all todos and fixmes in the project's root folder
-  [Humans.txt](https://humanstxt.org/) is being updated on each build

> :information_source: It is easy to add your HTML preprocessor, see [Add your HTML preprocessor in three steps](#add-your-html-preprocessor-in-three-steps)

---

## USAGE

-  place source files in the nunjucks dir in the src folder
-  configure all as required in `config.js`
-  Use console to navigate to the project root and start gulp

> :warning: Always build html before publishing it and after having finished bulding CSS and Javascript, to update their cachebust in HTML (e.g. src:"/main.js?20211010212110").
>
> :information_source: Activating watcher for this (JSON) file is probably not a good idea, because it would build HTML on any change in JavaScript and SCSS files.
>
> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

---

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', gulp-nunjucks-render, gulp-jsbeautifier.

#### Install

```cmd
npm install --save-dev gulp-nunjucks-render gulp-jsbeautifier
```

---

## LICENSE

> **YOU DO NOT HAVE TO LICENSE SITES OR THEMES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE.**
>
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

## COPYRIGHT

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

---
