// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const cfg = config.config;
const files = config.files;

// Gulp
const babel = require("gulp-babel");
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');


// ============== F U N C T I O N S ============== \\
// console info about the running task
const consoleInfo = function (cb) {
    console.log('========== TASK: JAVASCRIPT');

    cb();
}


// delete the output folder
const cleanDist = function (cb) {
    if (cfg.build.cleanDist) { _fn.rem(files.output, cb); }

    cb();
}


// write humans.txt
const humans = function (cb) {
    let humans = _fn.humansTxt();

    if (humans.check) { _fn.writeFile(humans.file, humans.content); }

    cb();
}


// Create a cacheBust file
// Its content is appended to the src url as a query
const cacheBust = function (cb) {
    _fn.cacheBust('javascript');

    cb();
}


// create todos
const todos = function (cb) {
    if (_fn.todoCheck()) {
        return _fn.src(files.watch, { allowEmpty: true })
            .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
            .pipe(_fn.gulptodo({
                fileName: 'LOG-TODO-JS.txt',
                absolute: false, // get filenames relative to project root
            }))
            .pipe(_fn.dest('.'));
    }

    cb();
}


// manual minification (even if false in the config)
const minifier = function (cb) {
    let header = _fn.headerCheck();

    // minify sequence
    let min = _fn.src(files.output + '/**/*.js', { allowEmpty: true })
        .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
        // add suffix
        .pipe(_fn.ren({ suffix: '.min' }))
        // remove console, alert, and debugger statements
        // replaced with: "void 0;" for safety, uglify removes it wherever ok
        .pipe(stripDebug())
        // minify
        .pipe(uglify())
        // dev info header
        .pipe(_fn.gulpif(header.check, _fn.fileHead(header.content)))
        // output
        .pipe(_fn.dest(files.output));

    cb();
}


// the main task
const main = function (cb) {
    // get bundle name and object
    let pkgName = Object.keys(cfg.bundles);
    let pkgObj = Object.values(cfg.bundles);

    // babel config names
    let babelCfgName = Object.keys(cfg.transpilation);
    // babel config objects
    let babelCfg = Object.values(cfg.transpilation);

    // developer header object
    let header = _fn.headerCheck();

    // sourcemapsCheck
    let checkSourcemaps = _fn.sourcemapsCheck();

    // go through all packages (bundles)
    for (let i = 0, bnds = pkgObj.length; i < bnds; i++) {
        // no output dir if false if config
        if (!pkgObj[i].outDir) { pkgObj[i].outDir = ''; }

        // transpilation types
        let _type = pkgObj[i].type;

        // go through all transpilation types for each bundle
        for (let j = 0, cfgNo = _type.length || 1; j < cfgNo; j++) {
            // transpile or not (yet modified below)
            let transpile = false;
            if (cfgNo && typeof cfgNo === 'number') { transpile = true; }

            // find out if the transpilation is required and if so, set its index
            let babelCfgIndex = babelCfgName.indexOf(_type[j]) >= 0
                ? babelCfgName.indexOf(_type[j])
                : false;

            // do not transpile if config not found (file will still be processed)
            if (babelCfgIndex === false) { transpile = false; }

            // suffix
            let suffix = _type[j]
                ? _type[j] === 'default' ? '' : '.' + _type[j]
                : '';

            // filename
            let filename = `${pkgName[i]}${suffix}.js`;

            // file output
            let file = _fn.merge2(_fn.src(pkgObj[i].src, { allowEmpty: true }))
                .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
                .pipe(_fn.gulpif(checkSourcemaps, _fn.smaps.init()))
                // concatenate files
                .pipe(_fn.concat(filename))
                // transpile
                .pipe(_fn.gulpif(transpile,
                    babel(babelCfg[babelCfgIndex])
                ))
                // if minifying, don't write sourcemaps, they break some plugins
                .pipe(_fn.gulpif(!cfg.build.minify,
                    _fn.gulpif(checkSourcemaps,
                        _fn.smaps.write('./sourcemaps')
                    )))
                // output
                .pipe(_fn.dest(files.output + '/' + pkgObj[i].outDir))

                // IF MINIFICATION ENABLED:
                // add suffix
                .pipe(_fn.gulpif(cfg.build.minify,
                    _fn.ren({ suffix: '.min' })
                ))
                // remove console, alert, and debugger statements
                // replaced with: "void 0;" for safety, uglify removes it wherever ok
                .pipe(_fn.gulpif(cfg.build.minify,
                    stripDebug()
                ))
                // minify
                .pipe(_fn.gulpif(cfg.build.minify,
                    uglify()
                ))
                // write sourcemaps
                .pipe(_fn.gulpif(cfg.build.minify,
                    _fn.gulpif(checkSourcemaps,
                        _fn.smaps.write('./sourcemaps')
                    )))
                // dev info header
                .pipe(_fn.gulpif(cfg.build.minify,
                    _fn.gulpif(header.check, _fn.fileHead(header.content))
                ))
                // output
                .pipe(_fn.gulpif(cfg.build.minify,
                    _fn.dest(files.output + '/' + pkgObj[i].outDir)
                ));
        }
    }

    cb();
}


// the complete process
exports.build = _fn.series(
    consoleInfo,
    _fn.parallel(cleanDist, todos), // todo takes too long if in parallel with others
    main,
    _fn.reloadPage,
    _fn.parallel(cacheBust, humans),
    _fn.endSound,
);

// manual minifier
exports.minify = minifier;

// source files to watch for changes
exports.watch = files.watch;
