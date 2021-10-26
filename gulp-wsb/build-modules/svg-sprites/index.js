// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// Explained at https://css-tricks.com/svg-symbol-good-choice-icons/

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js').config;

// Gulp
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');


// ============== F U N C T I O N S ============== //
// console info about the running task
const consoleInfo = function (cb) {
    console.log('========== TASK: SVG SPRITES');

    cb();
}


// write humans.txt
const humans = function (cb) {
    let humans = _fn.humansTxt();

    if (humans.check) { _fn.writeFile(humans.file, humans.content); }

    cb();
}


// files array for watcher
const watcher = function () {
    // get all sprite sources
    let source = Object.values(config.sprites);

    // watch files array
    let watchFiles = [];
    let srcCount = source.length;

    // get source for each sprite, and place it into the array
    for (let i = 0; i < srcCount; i++) {
        if (Array.isArray(source[i])) {

            source[i].forEach(function (files) {
                watchFiles.push(files);
            });

        } else {
            watchFiles.push(source[i]);
        }
    }

    return watchFiles;
}


// process svg files
const processSvg = function (source, filename) {
    return _fn.src(source, { base: proj.dirs.src.root, allowEmpty: true })
        .pipe(_fn.ren(function (file) {
            // remove spaces and prefix files, this will be svg's ID
            file.basename = 'icon-' + file.basename.split(' ').join('_');
            // remove unwanted characters
            file.basename = file.basename.replace(
                /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,|\./gi, ''
            ).toLowerCase();

            return file;
        }))
        .pipe(svgmin(config.minification))
        .pipe(svgstore())
        // rename sprite
        .pipe(_fn.ren({
            basename: filename,
            extname: '.svg'
        }))
        .pipe(_fn.dest(config.output));
}


// main task
const main = function (cb) {
    // get all sprite filenames
    let filename = Object.keys(config.sprites);

    // get all sprite sources
    let source = Object.values(config.sprites);

    // process each sprite
    for (let i = 0; i < source.length; i++) {
        processSvg(source[i], filename[i]);
    }

    cb();
}


// the complete process
exports.build = _fn.series(
    consoleInfo,
    _fn.parallel(main, humans),
    _fn.endSound,
);

// Source files to watch for changes with watch()
exports.watch = watcher();
