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
    let srcCount = source.length;

    // watch files array
    let watchFiles = [];

    // get source for each sprite, and place it into the array
    for (let i = 0; i < srcCount; i++) {
        watchFiles.push(source[i].src);
    }

    return watchFiles;
}


// main task
const main = function (cb) {
    const sprites = Object.values(config.sprites);
    const spritesCount = sprites.length;

    // process all sprites
    for (let i = 0; i < spritesCount; i++) {
        let sourceFiles = _fn.src(sprites[i].src, { allowEmpty: true })
            // clean filenames, they will be svg (symbol) ID's
            .pipe(_fn.ren(function (file) {
                // remove spaces and prefix files
                file.basename = 'icon-' + file.basename.split(' ').join('_');
                // remove unwanted characters
                file.basename = file.basename.replace(
                    /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,|\./gi, ''
                ).toLowerCase();

                return file;
            }))
            .pipe(svgmin(config.minification))
            .pipe(svgstore());

        // if multiple destinations
        if (Array.isArray(sprites[i].dest)) {
            let destCount = sprites[i].dest.length;

            for (let j = 0; j < destCount; j++) {
                let pathInfo = _fn.path.parse(sprites[i].dest[j]);

                sourceFiles
                    // rename sprite
                    .pipe(_fn.ren({
                        basename: pathInfo.name,
                        extname: pathInfo.ext
                    }))
                    .pipe(_fn.dest(pathInfo.dir + '/'));
            }
        } else {
            let pathInfo = _fn.path.parse(sprites[i].dest);
            sourceFiles
                // rename sprite
                .pipe(_fn.ren({
                    basename: pathInfo.name,
                    extname: pathInfo.ext
                }))
                .pipe(_fn.dest(pathInfo.dir + '/'));
        }
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
