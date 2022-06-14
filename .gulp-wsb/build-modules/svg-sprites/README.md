# SVG SPRITES MODULE

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

---

## FEATURES

- set folders whose content (SVG files) will be merged into a 'sprite'
- create multiple sprites, with different options for each
- minify SVGs
- option to keep/remove doctype
- prefixed IDs are automatically generated, using sprite name, dir name and filename, so files with the same filenames (in different directories) are possible, IDs will stil be unique

> :information_source: Inline SVGs in browser, not with Gulp, because of caching.
>
> :information_source: Read more about SVG sprites at [css-tricks](https://css-tricks.com/svg-symbol-good-choice-icons/)

## USAGE

- Edit configuration
- Run gulp
- Place files in their src dir, they will be processed automatically

> Configuration files (`config.js`) are commented for explanations.

---

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules', gulp-svgstore, gulp-svgmin.

#### Install

```cmd
npm install --save-dev gulp-svgstore gulp-svgmin
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
