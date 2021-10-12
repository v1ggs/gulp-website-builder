# DEVINFO MODULE

## GNU GENERAL PUBLIC LICENSE

## GENERAL INFO

Devinfo module writes humans.txt (https://humanstxt.org) in the site's public folder, and appends developer(s) header to JS and CSS, if requested in config (in production environment only). This header can also be used to add links to third party credits licenses.
Humans.txt has to be built with each task, because it contains site's 'last update time'.

Find all settings in the `config.js` file.

> Everything is configurable.

---

> Configuration files (`config.js`) are commented for explanations, which should be enough for those familiar with Gulp and JavaScript.

## USAGE

Configure header and humans.txt content in the configuration file:

### config.build

Choose what to write.

### config.header

Header content for JS and CSS. If minifiers don't remove 'important' comments, then don't set it as 'important' (`/*! *comment* */`). This will produce duplicate header in minified files.

### config.humans

Humans.txt content.

## INSTALLATION

### Required node modules

Only 'General Node Modules'.

## Copyright

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

## License

GNU GENERAL PUBLIC LICENSE
