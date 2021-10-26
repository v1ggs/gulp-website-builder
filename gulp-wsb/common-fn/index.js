// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\


// ============== P R O J E C T   C O N F I G ============== \\
const proj = require('../project-config');


// ============== N O D E ============== \\
const fs = require('fs');
const path = require('path');
const glob = require('glob');

exports.fs = fs;
exports.path = path;
exports.glob = glob;


// ============== G U L P ============== \\
const { gulp, src, dest, watch, series, parallel } = require("gulp");
const plumber = require('gulp-plumber');
const del = require("del");
const ren = require("gulp-rename");
const smaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const fileHead = require("gulp-header");
const gulptodo = require("gulp-todo");
const merge2 = require('merge2');
const browserSync = require('browser-sync').create();
const spawn = require('child_process').spawn;
// gulp-notify - Windows 10 Note:
// You might have to activate banner notification for the toast to show.
const notify = require('gulp-notify');
// const { cwd } = require('process');

exports.src = src;
exports.dest = dest;
exports.watch = watch;
exports.series = series;
exports.parallel = parallel;

exports.plumber = plumber;
exports.del = del;
exports.ren = ren;
exports.smaps = smaps;
exports.concat = concat;
exports.gulpif = gulpif;
exports.fileHead = fileHead;
exports.gulptodo = gulptodo;
exports.merge2 = merge2;
exports.browserSync = browserSync;
exports.spawn = spawn;


// ============== C O M M O N   M O D U L E S ============== \\
// DEVINFO
let devinfo, devinfoCfg;
try {
   devinfo = require('../build-modules/devinfo');
   devinfoCfg = devinfo.config;
} catch (err) {
   /* console.log(err); */
   devinfo = false;
   devinfoCfg = false;
}


// ============== S E R V E R ============== \\
const serverCfg = function () {
   // WordPress theme directory
   const wpDir = '/wp-content/themes/' + proj.config.project.domain;
   // output dir for html file
   let htmlDist;
   // used in assetsInHtml (html module - for global variables)
   let assetsReference;

   if (proj.config.build.type === 1) {
      // static page design
      htmlDist = './' + proj.config.dirname.public_html;
      assetsReference = '';
   } else if (proj.config.build.type === 2) {
      // static design for future use with WordPress
      // assets links in html (script, stylesheet) point to assets in the WP theme dir
      // server is configured to run pages from the WP dir,
      // but server's root remains in the site's root
      htmlDist = './' + proj.config.dirname.public_html + wpDir;
      assetsReference = wpDir;
   }

   // assets dist dir
   const assetsDist = htmlDist + '/' + proj.config.dirname.dist;
   // same dir as assetsDist but for usage with html module (for global variables)
   const assetsInHtml = assetsReference + '/' + proj.config.dirname.dist;

   // server and proxy cannot be both defined at the same time
   let _server = './' + proj.config.dirname.public_html;
   let _proxy = undefined;
   // static page design
   let _index = proj.config.build.serve;
   if (proj.config.build.type === 2) {
      // static design for future use with WordPress
      _index = wpDir + '/' + proj.config.build.serve;
   }

   // proxy a domain, e.g. dev-yourdomain.com (local WordPress),
   // to be able to inject CSS/JS, and stream/reload page on save
   if (proj.config.build.proxy) {
      _server = false;
      _proxy = proj.config.build.proxy;
      _index = false;
   }

   cfg = {
      server: _server, // start server in folder
      proxy: _proxy, // proxy a site (or XAMPP virtual host), default: undefined
      index: _index, // file to serve as site index
      host: null, // Type: String, Default: null - Override host detection if you know the correct IP to use (e.g. '192.168.42.95')
      ghostMode: false, // 'true' mirrors interactions in other browsers
      online: true, // online: true - will not attempt to determine your network status, assumes you're online.
      open: true, // 'external' or 'local', to open in browser(s)
      browser: [ /* 'chrome', 'firefox', 'opera', 'msedge', 'iexplore' */], // browsers to open the homepage (exe filenames)
      notify: false, // browsersync notification on load/reload in the browser window
      logConnections: true, // Display connected browsers.
      timestamps: false, // Append timestamps to injected files
   }

   return {
      config: cfg,
      htmlDist: htmlDist,
      assetsDist: assetsDist,
      assetsInHtml: assetsInHtml,
   };
}

exports.serverCfg = serverCfg;

const startServer = function () {
   let cfg = serverCfg().config;
   browserSync.init(cfg);
}

exports.startServer = startServer;


const reloadPage = function (cb) {
   browserSync.reload();

   cb();
}

exports.reloadPage = reloadPage;


// ============== C O M M O N   F U N C T I O N S ============== \\
// signal task end to the developer
const endSound = function (cb) {
   if (proj.config.build.signalEnd) { console.info('\x07'); }

   cb();
}

exports.endSound = endSound;

// todo check
const todoCheck = function () {
   let todos = false;
   // create a TODO file with all todos and fixmes for css and js
   if (proj.config.build.env === 'dev') { todos = true; }

   return todos;
}

exports.todoCheck = todoCheck;


// dev header check
const headerCheck = function () {
   let _make = false;
   let _content = false;
   if (devinfo && proj.config.build.env === 'prod') {
      _make = devinfoCfg.build.header;
      _content = devinfoCfg.header;
   }

   return { check: _make, content: _content };
}

exports.headerCheck = headerCheck;


// humans.txt
const humansTxt = function () {
   let _make = false;
   let _content = false;
   let _file = './' + proj.config.dirname.public_html + '/humans.txt';

   if (devinfo) {
      // check in config (true|false)
      _make = devinfoCfg.build.humans;

      // get the time
      let _t = getTime();

      // file contents
      _content = devinfoCfg.humans;

      // last update time
      _content += `${_t.y}/${_t.mn}/${_t.d} ${_t.h}:${_t.m} CET\n`;
   }

   return { check: _make, file: _file, content: _content };
}

exports.humansTxt = humansTxt;


// sourcemaps check
const sourcemapsCheck = function () {
   // header breaks sourcemaps
   let header = headerCheck();
   let sourcemaps = false;
   if (!header.check && proj.config.build.env === 'dev') {
      sourcemaps = true;
   }

   return sourcemaps;
}

exports.sourcemapsCheck = sourcemapsCheck;


// delete file/folder
const remove = function (path, cb) {
   if (fs.existsSync(path)) { del.sync([path]); }

   cb();
}

exports.rem = remove;


// error handler for gulp-plumber, using gulp-notify
const plumberErrHandler = function (error) {
   notify.onError({
      title: "Gulp: Error in " + error.plugin,
      message: "<%= error.message %>",
   })(error);
   this.emit('end');
}

exports.errHandler = plumberErrHandler;


// Create a cacheBust file (JSON)
// _key is a key in the JSON, named after the file type (js|css|...) where it's used
const cacheBust = function (_key) {
   // get the time
   let _t = getTime();

   // cacheBust contents (modification time)
   let _content = `${_t.y}${_t.mn}${_t.d}${_t.h}${_t.m}${_t.s}`;

   // get absolute path to the cache bust file
   let filePath = path.resolve(proj.files.cachebust);

   try {
      const file = require(filePath);
      file[_key] = _content;

      // write file
      // JSON.stringify(file, replacer function, spaces to indent)
      writeFile(filePath, JSON.stringify(file, null, 2));
   } catch (err) {
      // console.log(err);

      // create file
      writeFile(filePath, '{}');

      const file = require(filePath);
      file[_key] = _content;

      // write file
      // JSON.stringify(file, replacer function, spaces to indent)
      writeFile(filePath, JSON.stringify(file, null, 2));
   }
}

exports.cacheBust = cacheBust;


// time with leading zeros
const getTime = function () {
   let nd = new Date();
   let t = [];

   t.y = nd.getFullYear();
   t.mn = ('0' + (nd.getMonth() + 1)).slice(-2);
   t.d = ('0' + nd.getDate()).slice(-2);
   t.h = ('0' + (nd.getHours())).slice(-2);
   t.m = ('0' + (nd.getMinutes())).slice(-2);
   t.s = ('0' + (nd.getSeconds())).slice(-2);

   return t;
}

exports.time = getTime;


// write files to disk
const writeFile = function (file, content) {
   // get file path
   let _path = path.parse(file);

   // make dir
   let _md = fs.mkdirSync(_path.dir, { recursive: true });

   // then write the file
   return fs.writeFileSync(
      file,
      content,
      { encoding: 'utf8' },
      function (err) {
         if (err) {
            console.log('========== WRITE FILE ERROR:');
            console.log('========== ' + file);
            console.log(err);
         }
      },
   );
}

exports.writeFile = writeFile;
