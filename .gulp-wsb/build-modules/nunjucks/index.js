// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const cfg = config.config;

// Gulp
const htmlProcessor = require('gulp-nunjucks-render');
const beautifyHtml = require('gulp-jsbeautifier');

// ============== F U N C T I O N S ============== \\
// console info about the running task
const consoleInfo = function (cb) {
   console.log('==========');
   console.log('========== TASK: NUNJUCKS');
   console.log('==========');

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

// create todos
const todos = function (cb) {
   var srcFiles = [];

   if (_fn.todoCheck()) {
      if (Array.isArray(config.files.watch)) {
         config.files.watch.forEach((element) => {
            // exclude extensions
            let srcPath = element.replace(/json|jsonc/gi, '');
            srcFiles.push(srcPath);
         });
      } else {
         // exclude extensions
         let srcPath = config.files.watch.replace(/json|jsonc/gi, '');
         srcFiles.push(srcPath);
      }

      return _fn
         .src(srcFiles, { allowEmpty: true })
         .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
         .pipe(
            _fn.gulptodo({
               fileName: 'LOG-TODO-HTML.txt',
               absolute: false, // write filenames relative to project root
            })
         )
         .pipe(_fn.dest('./' + proj.config.dirname.log));
   }

   cb();
};

// main task
const main = function () {
   return (
      _fn
         .src(config.files.src, { allowEmpty: true })
         .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))

         // ==========================================
         // IF YOU USE ANOTHER PREPROCESSOR:
         // 1. create a new module
         // 2. require your preprosessor at the top of this file, in:
         //    "const htmlProcessor = require('gulp-nunjucks-render');"
         // 3. in config file: modify "const config" and
         //    remove "const manageEnvironment"
         .pipe(htmlProcessor(cfg))
         // ==========================================

         .pipe(beautifyHtml(config.formatHtml))
         .pipe(
            _fn.gulpif(
               // change output file extension, if set in config
               typeof config.files.extension === 'string',
               _fn.ren({ extname: `.${config.files.extension}` })
            )
         )
         .pipe(_fn.dest(config.files.output))
   );
};

// the complete process
exports.build = _fn.series(
   consoleInfo,
   main,
   _fn.parallel(_fn.reloadPage, humans),
   todos, // todo takes too long (> 1sec) if in parallel with others
   _fn.endSound
);

// source files to watch for changes
exports.watch = config.files.watch;
