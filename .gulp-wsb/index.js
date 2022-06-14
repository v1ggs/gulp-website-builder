// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// ============== C O N F I G ============== \\
const _fn = require('./common-fn');

// ============== A L L   T A S K S ============== \\
// set dir for watcher
let pathStart = __dirname.match(/(.*)[\/\\]/)[0] || '';
let gulpCfg = __dirname.slice(pathStart.length);

// for watcher to restart gulp on config change
const watchGulpCfg = [
   './gulpfile.js',
   './' + gulpCfg + '/**/*.js',
   './.browserslistrc',
   './.babelrc',
];

const allTasks = function (cb) {
   console.log('==========');
   console.log('========== STARTING THE MAIN TASK...');
   console.log('==========');
   console.log('========== WAIT FOR THE SERVER TO START');
   console.log('==========');
   console.log('==========');
   console.log('========== CTRL+C TO STOP GULP');
   console.log('========== CTRL+S TO PAUSE GULP');
   console.log('==========');

   // start browsersync
   _fn.startServer();

   // ****************************************************************** \\
   // ************************* M O D U L E S ************************** \\
   // ****************************************************************** \\
   // ********************** ADD ALL MODULES HERE ********************** \\
   // ****************************************************************** \\

   // WORDPRESS
   try {
      let wp = require('./build-modules/wp');
      // if developing for wordpress, initialise wp theme
      // make required folder and files for the theme
      wp.wpInit();
      // watch files for changes
      _fn.watch(wp.watch, { events: 'all' }, wp.build);
   } catch (err) {
      console.log('========== WORDPRESS module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // NUNJUCKS
   try {
      let njk = require('./build-modules/nunjucks');
      // watch files for changes
      _fn.watch(njk.watch, { events: 'all' }, njk.build);
   } catch (err) {
      console.log('========== NUNJUCKS module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // SCSS
   try {
      let scss = require('./build-modules/scss');
      // watch files for changes
      _fn.watch(scss.watch, { events: 'all' }, scss.build);
   } catch (err) {
      console.log('========== SCSS module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // JS
   try {
      let js = require('./build-modules/javascript');
      // watch files for changes
      _fn.watch(js.watch, { events: 'all' }, js.build);
   } catch (err) {
      console.log('========== JAVASCRIPT module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // IMG
   try {
      let images = require('./build-modules/images');
      // watch files for changes
      _fn.watch(images.watch, { events: 'all' }, images.build);
   } catch (err) {
      console.log('========== IMAGES module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // SVG SPRITES
   try {
      let svgSprites = require('./build-modules/svg-sprites');
      // watch files for changes
      _fn.watch(svgSprites.watch, { events: 'all' }, svgSprites.build);
   } catch (err) {
      console.log('========== SVG SPRITES module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // FILECOPY
   try {
      let fc = require('./build-modules/filecopy');
      // watch files for changes
      _fn.watch(fc.watch, { events: 'all' }, fc.filecopy);
   } catch (err) {
      console.log('========== FILECOPY module:');
      console.log('========== Something went wrong or module not found...');
      console.log('==========');
      // uncomment to debug
      // console.log(err);
   }

   // ****************************************************************** \\
   // ****************************************************************** \\
   // ****************************************************************** \\

   // GULP CONFIG FILES - Stop current task on file change
   _fn.watch(watchGulpCfg, function (cb) {
      console.log('==========');
      console.log('========== STOPPING CURRENT TASK...');
      console.log('==========');
      cb();
      process.exit();
   });

   console.info('\x07'); // sound
   cb();
};

// Restart allTasks - use this one in gulpfile.js
const gulpDefault = function (cb) {
   let spn = false;

   _fn.watch(watchGulpCfg, spawnChildren);

   spawnChildren(cb);

   function spawnChildren(cb) {
      // ['watch'] is the task (exports.watch in gulpfile.js) which calls allTasks
      spn = _fn.spawn('gulp', ['watch'], { stdio: 'inherit', shell: true });

      cb();
   }
};

// the default task in gulpfile.js
exports.run = gulpDefault;
// also required in gulpfile.js
exports.watch = allTasks;
