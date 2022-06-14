// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\

// ============== P R O J E C T   C O N F I G ============== \\
const proj = require('../project-config');

// ============== N O D E ============== \\
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const projectRoot = process.cwd();

exports.fs = fs;
exports.path = path;
exports.glob = glob;
exports.projectRoot = projectRoot;

// ============== G U L P ============== \\
const { gulp, src, dest, watch, series, parallel } = require('gulp');
const sharp = require('sharp');
const plumber = require('gulp-plumber');
const del = require('del');
const ren = require('gulp-rename');
const admZip = require('adm-zip');
const smaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const fileHead = require('gulp-header');
const gulptodo = require('gulp-todo');
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

exports.sharp = sharp;
exports.plumber = plumber;
exports.del = del;
exports.ren = ren;
exports.admZip = admZip;
exports.smaps = smaps;
exports.concat = concat;
exports.gulpif = gulpif;
exports.fileHead = fileHead;
exports.gulptodo = gulptodo;
exports.merge2 = merge2;
exports.browserSync = browserSync;
exports.spawn = spawn;

// ============== C O M M O N   F U N C T I O N S ============== \\
// signal task end to the developer
const endSound = function (cb) {
   if (proj.config.build.signalEnd) {
      console.info('\x07');
   }

   cb();
};

exports.endSound = endSound;

// todo check
const todoCheck = function () {
   let todos = false;
   // create a TODO file with all todos and fixmes for css and js
   if (proj.config.build.env === 'dev') {
      todos = true;
   }

   return todos;
};

exports.todoCheck = todoCheck;

// dev header check
const headerCheck = function () {
   let make = false;
   let content = false;
   if (proj.config.build.env === 'prod') {
      make = proj.developerInfo.build.header;
      content = proj.developerInfo.header;
   }

   return { check: make, content: content };
};

exports.headerCheck = headerCheck;

// humans.txt
const humansTxt = function () {
   let make = false;
   let content = false;
   let file = proj.files.humansTxt;

   if (proj.developerInfo.build.humans) {
      // check in config (true|false)
      make = proj.developerInfo.build.humans;

      // get the time
      let t = getTime();

      // Write BOM
      // "UTF-8 might not require a BOM in sane OSes and apps,
      // but under Windows it just about always does." from:
      // https://stackoverflow.com/questions/13859218/nodejs-how-to-make-function-fs-writefile-write-with-bom
      content = '\ufeff';

      // file contents
      content += proj.developerInfo.humans;

      // last update time
      content += `${t.y}/${t.mn}/${t.d} ${t.h}:${t.m} CET\n`;
   }

   return { check: make, file: file, content: content };
};

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
};

exports.sourcemapsCheck = sourcemapsCheck;

// delete file/folder
const remove = function (path) {
   if (fs.existsSync(path)) {
      del.sync([path]);
   }
};

exports.rem = remove;

// error handler for gulp-plumber, using gulp-notify
const plumberErrHandler = function (error) {
   notify.onError({
      title: 'Gulp: Error in ' + error.plugin,
      message: '<%= error.message %>',
   })(error);
   this.emit('end');
};

exports.errHandler = plumberErrHandler;

// Create a cacheBust file (JSON)
// key is a key in the JSON, named after the file
// type (js|css|...) for which it's being used
const cacheBust = function (key) {
   // get the time
   let t = getTime();

   // cacheBust contents (modification time)
   let content = `${t.y}${t.mn}${t.d}${t.h}${t.m}${t.s}`;

   // get absolute path to the cache bust file
   let filePath = path.resolve(proj.files.cachebust);

   try {
      const file = require(filePath);
      file[key] = content;

      // write file
      // JSON.stringify(file, replacer function, spaces to indent)
      writeFile(filePath, JSON.stringify(file, null, 2));
   } catch (err) {
      // console.log(err);

      // create file
      writeFile(filePath, '{}');

      const file = require(filePath);
      file[key] = content;

      // write file
      // JSON.stringify(file, replacer function, spaces to indent)
      writeFile(filePath, JSON.stringify(file, null, 2));
   }
};

exports.cacheBust = cacheBust;

// time with leading zeros
const getTime = function () {
   let nd = new Date();
   let t = [];

   t.y = nd.getFullYear();
   t.mn = ('0' + (nd.getMonth() + 1)).slice(-2);
   t.d = ('0' + nd.getDate()).slice(-2);
   t.h = ('0' + nd.getHours()).slice(-2);
   t.m = ('0' + nd.getMinutes()).slice(-2);
   t.s = ('0' + nd.getSeconds()).slice(-2);

   return t;
};

exports.time = getTime;

// write files to disk
const writeFile = function (file, content) {
   // get file path
   let _path = path.parse(file);

   // make dir
   let _md = fs.mkdirSync(_path.dir, { recursive: true });

   // write the file
   return fs.writeFileSync(file, content, { encoding: 'utf8' }, function (err) {
      if (err) {
         console.log('========== WRITE FILE ERROR:');
         console.log('========== ' + file);
         console.log(err);
      }
   });
};

exports.writeFile = writeFile;

const cleanString = function (str) {
   return str.toLowerCase().replace(
      // remove symbols
      /\!|\?|\/|\\|\<|\>|\;|\:|\@|\#|\$|\%|\^|\&|\+|\=|\(|\)|\[|\]|\{|\}|\'|\"|\,/gi,
      ''
   );
};

exports.cleanString = cleanString;

// str = string to modify
// separator = where to split words
// joiner = join words with
function makeTitleCase(string, separator = ' ', joiner = ' ') {
   let words = string.split(separator);
   const wordsCount = words.length;

   for (let i = 0; i < wordsCount; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
   }

   return words.join(joiner);
}

exports.makeTitleCase = makeTitleCase;

const makeThemeSlug = function (str) {
   return cleanString(str)
      .replaceAll(/-|\s|\./gi, '_')
      .replaceAll('____', '_')
      .replaceAll('___', '_')
      .replaceAll('__', '_');
};

exports.makeThemeSlug = makeThemeSlug;

const makeTextDomain = function (str) {
   return cleanString(str)
      .replaceAll(/_|\s|\./gi, '-')
      .replaceAll('----', '-')
      .replaceAll('---', '-')
      .replaceAll('--', '-');
};

exports.makeTextDomain = makeTextDomain;

// ============== S E R V E R ============== \\
const serverCfg = function (textDomain) {
   // WordPress theme directory
   let wpDirName, wpDir;
   // output dir for html file
   let htmlDist = '';
   // used in assetsForHtmlProcessor (html processor module - for global variables)
   let assetsReference = '';

   if (proj.config.build.type === 'static') {
      // static page design
      htmlDist = proj.dirs.siteRoot;
      assetsReference = '';
   } else if (proj.config.build.type === 'wp') {
      // design with WordPress
      // 1. server is configured to proxy a domain
      // 2. output dir is set to theme dir
      // 3. assets in html point to assets in the WP theme dir, but
      // you will still use get_template_directory_uri() etc.

      // WordPress theme directory
      wpDirName = textDomain ? textDomain : '';
      wpDir = textDomain ? '/wp-content/themes/' + wpDirName : '';
      htmlDist = proj.dirs.siteRoot + wpDir;
      assetsReference = wpDir;
   }

   // assets dist dir
   const assetsDist = htmlDist + '/' + proj.config.dirname.dist;
   // same dir as assetsDist but for usage with nunjucks module (for global variables)
   const assetsForHtmlProcessor =
      assetsReference + '/' + proj.config.dirname.dist;

   // server and proxy cannot be both defined at the same time
   let _proxy = undefined;
   let _server = proj.dirs.siteRoot;
   // static page design
   let _index = proj.config.build.serve;

   // design with WordPress
   if (proj.config.build.type === 'wp') {
      // proxy a domain, e.g. dev-yourdomain.com (local WordPress),
      // to be able to inject CSS/JS, and stream/reload page on save
      _proxy = proj.config.build.proxy;
      _server = false;
      _index = false;
   }

   let _https = false;
   if (proj.config.build.key && proj.config.build.cert) {
      _https = {
         key: proj.config.build.key,
         cert: proj.config.build.cert,
      };
   }

   cfg = {
      // start server in folder
      server: _server,
      // use https
      https: _https,
      // proxy a site (or XAMPP virtual host), default: undefined
      proxy: _proxy,
      // file to serve as site index
      index: _index,
      // Type: String, Default: null
      // Override host detection if you know the correct IP to use (e.g. '192.168.42.95')
      host: proj.config.build.ip ? proj.config.build.ip : null,
      // default port (3000)
      port: 3000,
      // 'true' mirrors interactions in other browsers
      ghostMode: true,
      // online: true - will not attempt to determine your network status, assumes you're online.
      online: true,
      // Decide which URL to open automatically when Browsersync starts.
      // Defaults to "local" if none set. Can be true, local, external, ui, ui-external, tunnel or false
      open: false,
      // browsers to open the homepage with automatically (exe filenames)
      browser: ['chrome', 'firefox', 'opera', 'msedge', 'iexplore'],
      // browsersync notification on load/reload in the browser window
      notify: false,
      // Display connected browsers in console
      logConnections: true,
      // Append timestamps to injected files
      timestamps: false,
   };

   return {
      // browsersync config
      config: cfg,
      // site root
      html: htmlDist,
      // site root subfolder where all assets go (js, css, images...)
      assets: assetsDist,
      // path to assets to use inside html preprocessor config, for usage in html files
      assetsForHtmlProcessor: assetsForHtmlProcessor,
      // wordpress theme folder name
      wpThemeDirName: wpDirName,
   };
};

exports.serverCfg = serverCfg;

const startServer = function () {
   let cfg = serverCfg().config;
   browserSync.init(cfg);
};

exports.startServer = startServer;

const reloadPage = function (cb) {
   browserSync.reload();

   cb();
};

exports.reloadPage = reloadPage;

const textDomain = makeTextDomain(proj.config.project.name);

exports.textDomain = textDomain;

const _dist = serverCfg(textDomain);

exports.dist = _dist;
