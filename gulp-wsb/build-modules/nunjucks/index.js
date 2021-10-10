// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const cfg = config.config;
const files = config.files;

// Gulp
const nunjucksRender = require('gulp-nunjucks-render');
const beautifyHtml = require('gulp-jsbeautifier');


// ============== F U N C T I O N S ============== \\
// console info about the running task
const consoleInfo = function (cb) {
    console.log('========== TASK: NUNJUCKS');

    cb();
}


// write humans.txt
const humans = function (cb) {
    let humans = _fn.humansTxt();

    if (humans.check) { _fn.writeFile(humans.file, humans.content); }

    cb();
}


// create todos
const todos = function (cb) {
    if (_fn.todoCheck()) {
        return _fn.src(files.watch, { allowEmpty: true })
            .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
            .pipe(_fn.gulptodo({
                fileName: 'LOG-TODO-HTML.txt',
                absolute: false, // write filenames relative to project root
            }))
            .pipe(_fn.dest('.'));
    }

    cb();
}


// main task
const main = function () {
    return _fn.src(files.src, { allowEmpty: true })
        .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
        .pipe(nunjucksRender(cfg))
        .pipe(beautifyHtml(config.formatHtml))
        .pipe(_fn.dest(files.output));
}


// the complete process
exports.build = _fn.series(
    consoleInfo,
    main,
    _fn.parallel(_fn.reloadPage, humans),
    todos, // todo takes too long (> 1sec) if in parallel with others
    _fn.endSound,
);

// source files to watch for changes
exports.watch = files.watch;