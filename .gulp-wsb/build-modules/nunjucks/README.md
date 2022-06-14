# NUNJUCKS MODULE

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

---

## FEATURES

- configure global variables and filters for usage in .njk files
- format output HTML
- change output file extension (e.g. "php")
- a TODO file (.txt) with all todos and fixmes in the ".log/" dir
- [Humans.txt](https://humanstxt.org/) is being updated on each build

> :warning: Always build html before publishing it and after having finished bulding CSS and Javascript, to update their cachebust in HTML (e.g. src:"/main.js?20211010212110").\
> Activating watcher for this (JSON) cachebust file is probably not a good idea, because it would build HTML on any change in JavaScript and SCSS files.
>
> :information_source: It is easy to add your HTML preprocessor, see [Add your HTML preprocessor in three steps](#add-your-html-preprocessor-in-three-steps)

---

## USAGE

- place source files in the nunjucks dir in the src folder
- configure all as required in `config.js`
- Use console to navigate to the project root and start gulp

> :warning: Always build html before publishing it and after having finished bulding CSS and Javascript, to update their cachebust in HTML (e.g. src:"/main.js?20211010212110").
>
> :information_source: Activating watcher for this (JSON) file is probably not a good idea, because it would build HTML on any change in JavaScript and SCSS files.
>
> Configuration files (`config.js`) are commented for explanations.

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

### **© 2021 [Igor Vračar](https://www.igorvracar.com)**

---
