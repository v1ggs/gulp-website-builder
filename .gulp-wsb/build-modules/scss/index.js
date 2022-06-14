// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const cfg = config.config;
const files = config.config.files;

// Gulp
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const fixFlexbugs = require('postcss-flexbugs-fixes');
// https://www.npmjs.com/package/postcss-inline-svg
// reference an SVG file and control its attributes with CSS syntax
const inlineSvg = require('postcss-inline-svg');
// https://www.npmjs.com/package/postcss-svgo
// Optimise inline SVG with PostCSS
const svgo = require('postcss-svgo');
const autoprefixer = require('autoprefixer');
const discardComments = require('postcss-discard-comments');
const sortMediaQueries = require('postcss-sort-media-queries');
const doiuse = require('doiuse');
// https://www.npmjs.com/package/csso
const csso = require('postcss-csso');
// @fullhuman/postcss-purgecss can't get rejected selectors
const postcssPurgecss = require('@fullhuman/postcss-purgecss');
// gulp-sourcemaps does not work with gulp-purgecss
const purgecss = require('gulp-purgecss');

// ============== S E T T I N G S ============== \\
// purgecss options
const purgeCssOptions = function () {
   return {
      content: cfg.purgecss.analyze,
      safelist: cfg.purgecss.safelisting,
      keyframes: cfg.purgecss.keyframes,
      fontFace: cfg.purgecss.fontface,
      rejected: false,
      skippedContentGlobs: ['node_modules/**'],
   };
};

// set postcss plugins according to the config
const postCssPlugins = function () {
   let plugins = [inlineSvg(cfg.inlineSvg), svgo(cfg.svgo)];

   if (cfg.build.keepComments === 'none') {
      plugins.push(discardComments({ removeAll: true }));
   } else if (cfg.build.keepComments === 'important') {
      plugins.push(discardComments({ removeAll: false }));
   } else if (cfg.build.keepComments === 'first') {
      plugins.push(discardComments({ removeAllButFirst: true }));
   }

   if (cfg.build.purge) {
      plugins.push(postcssPurgecss(purgeCssOptions()));
   }

   if (cfg.build.fixFlexbugs) {
      plugins.push(fixFlexbugs(cfg.fixFlexbugs));
   }

   if (cfg.build.prefix) {
      plugins.push(autoprefixer(cfg.autoprefixer));
   }

   if (cfg.build.combineMQ) {
      plugins.push(sortMediaQueries({ sort: cfg.build.combineMQ }));
   }

   if (proj.config.build.env === 'dev') {
      /* https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node/43370201#43370201
        not required to use stream.end(), default option is AutoClose:true, so file will end when process ends. */
      let logFile = _fn.fs.createWriteStream(
         './' + proj.config.dirname.log + '/LOG-DOIUSE.txt',
         { flags: 'w' }
      );

      plugins.push(
         doiuse({
            // Lint for browser support and display info for unsupported
            // *** uses config.autoprefixer.overrideBrowserslist ***
            browsers: cfg.autoprefixer.overrideBrowserslist,
            ignore: cfg.doiuse.ignore,
            ignoreFiles: cfg.doiuse.ignoreFiles,
            onFeatureUsage: function (usageInfo) {
               logFile.write(usageInfo.message + '\n\n', 'utf-8');
            },
         })
      );
   }

   if (cfg.build.minify) {
      plugins.push(
         csso({
            restructure: true,
            sourceMap: false,

            // comments: 'exclamation' or true | 'first-exclamation' | false (remove all)
            comments: 'exclamation',

            // show additional debug information
            // true or number from 1 to 3 (greater number - more details)
            debug: false,

            // done better with other tools
            //forceMediaMerge: true,
         })
      );
   }

   return plugins;
};

// ============== F U N C T I O N S ============== \\
// console info about the running task
const consoleInfo = function (cb) {
   console.log('==========');
   console.log('========== TASK: SCSS');
   console.log('==========');
   cb();
};

// delete the output folder
const cleanDist = function (cb) {
   if (cfg.build.cleanDist) {
      _fn.rem(files.output, cb);
   }
   cb();
};

// write humans.txt
const humans = function (cb) {
   let humans = _fn.humansTxt();
   if (humans.check) {
      _fn.writeFile(humans.file, humans.content);
   }
   cb();
};

// Create a cacheBust file
// Its content is appended to the src url as a query
const cacheBust = function (cb) {
   _fn.cacheBust('css');
   cb();
};

// create todos
const todos = function (cb) {
   if (_fn.todoCheck()) {
      return _fn
         .src(files.watch, { allowEmpty: true })
         .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
         .pipe(
            _fn.gulptodo({
               fileName: 'LOG-TODO-SCSS.txt',
               // write filenames relative to project root
               absolute: false,
            })
         )
         .pipe(_fn.dest('./' + proj.config.dirname.log));
   }

   cb();
};

// build source
// tried different ways, but sourcemaps break
// this is the only way it worked (build source for each process)
const buildSource = function () {
   let checkSourcemaps = _fn.sourcemapsCheck();

   return _fn
      .src(files.src, {
         allowEmpty: true,
         base: proj.dirs.src.scss + '/',
      })
      .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
      .pipe(_fn.gulpif(checkSourcemaps, _fn.smaps.init()))
      .pipe(
         sass({
            // An array of paths that sass can look in to attempt to
            // resolve your @import declarations.
            includePaths: cfg.files.includePaths,
            // nested | expanded | compact | compressed
            outputStyle: 'expanded',
            // 'space' | 'tab'
            indentType: 'space',
            // max 10, default: 2
            indentWidth: 3,
         })
      )
      .pipe(
         _fn.ren(function (path) {
            if (path.basename === 'main') {
               path.basename = 'style';
            }
         })
      );
};

// purgecss - return unused selectors
const rejected = function (cb) {
   if (cfg.build.purge) {
      let opts = purgeCssOptions();
      opts.rejected = true;

      let rejected = buildSource()
         .pipe(_fn.ren({ suffix: '.rejected' }))
         .pipe(purgecss(opts))
         .pipe(_fn.dest(cfg.files.output));
   }

   cb();
};

// no plugins, just sass and header
const unprocessed = function (cb) {
   let checkSourcemaps = _fn.sourcemapsCheck();
   let header = _fn.headerCheck();
   let unprocessed = buildSource()
      .pipe(_fn.ren({ suffix: '.unprocessed' }))
      .pipe(_fn.gulpif(checkSourcemaps, _fn.smaps.write('./sourcemaps')))
      .pipe(_fn.gulpif(header.check, _fn.fileHead(header.content)))
      .pipe(_fn.dest(cfg.files.output))
      .pipe(_fn.browserSync.stream());

   cb();
};

// main task
const main = function (cb) {
   let checkSourcemaps = _fn.sourcemapsCheck();
   let header = _fn.headerCheck();
   let plugins = postCssPlugins();
   let processed = buildSource()
      .pipe(postcss(plugins))
      .pipe(_fn.gulpif(cfg.build.minify, _fn.ren({ suffix: '.min' })))
      .pipe(_fn.gulpif(checkSourcemaps, _fn.smaps.write('./sourcemaps')))
      .pipe(_fn.gulpif(header.check, _fn.fileHead(header.content)))
      .pipe(_fn.dest(cfg.files.output))
      .pipe(_fn.browserSync.stream());

   cb();
};

// minify manually
const minifier = function (cb) {
   let header = _fn.headerCheck();
   let minify = _fn
      .src(files.output + '/**/*.css', {
         allowEmpty: true,
         base: files.output + '/',
      })
      .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
      .pipe(_fn.ren({ suffix: '.min' }))
      .pipe(
         postcss([
            csso({
               restructure: true,
               sourceMap: false,
               // comments: 'exclamation' or true | 'first-exclamation' | false (remove all)
               comments: 'exclamation',
               // show additional debug information
               // true or number from 1 to 3 (greater number - more details)
               debug: false,
               //forceMediaMerge: true, // done better with other tools
            }),
         ])
      )
      .pipe(_fn.gulpif(header.check, _fn.fileHead(header.content)))
      .pipe(_fn.dest(files.output));

   cb();
};

// the complete process
exports.build = _fn.series(
   consoleInfo,
   _fn.parallel(cleanDist, todos), // todo takes too long if in parallel with others
   main,
   _fn.parallel(cacheBust, humans, unprocessed, rejected),
   _fn.endSound
);

// manual minifier
exports.minify = minifier;

// source files to watch for changes
exports.watch = files.watch;
