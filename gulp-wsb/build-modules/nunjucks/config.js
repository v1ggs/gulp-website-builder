/* ***************  H T M L   C O N F I G  *************** */

/* *************************************************** */
// import project config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const serverCfg = _fn.serverCfg();
const assets = serverCfg.assetsInHtml; // assets links in html (global var)
const _src = proj.dirs.src.html;
const _dist = serverCfg.htmlDist;
/* *************************************************** */

const files = {
   // src files to build
   src: [_src + '/index.njk', _src + '/error.njk'],
   // string/array - files to watch for changes and build todos/fixmes file
   watch: _src + '/**/*.{njk,nj,nunjucks,json}',
   // output
   output: _dist,
};

// nunjucks globals - set here and use across .njk files as variables or filters
const manageEnvironment = function (environment) {
   // ------------ global variables ------------ \\
   // project info - mught be needed
   environment.addGlobal('project', {
      name: proj.config.project.name,
      desription: proj.config.project.description,
      domain: 'https://www.' + proj.config.project.domain, // notice 'https'
   });

   // assets folders, use like e.g. 'src="{{ assets.css }}/style.min.css"'
   environment.addGlobal('assets', {
      root: assets,
      css: assets + '/css',
      js: assets + '/js',
      img: assets + '/img',
      fonts: assets + '/fonts',
      ico: assets + '/icons',
      sounds: assets + '/sounds',
      videos: assets + '/videos',
   });

   // ------------ custom filters ------------ \\
   // get array from a space separated string
   environment.addFilter('split', function (string) {
      var txt = string.split(' ');
      return txt;
   });

   // string replace all
   environment.addFilter('replace', function (string, find, replace) {
      var txt = string.replace(new RegExp(find, 'g'), replace);
      return txt;
   });

   // make slug:
   // <h3>{{ 'My Important Post'| slug }}</h3> makes <h3>my-important-post</h3>
   environment.addFilter('slug', function (str) {
      return str && str.replace(/\s/g, '-', str).toLowerCase();
   });

   // convert to JSON
   environment.addFilter('json', function (value) {
      // convert the complete string imported by Nunjucks into JSON and return
      return JSON.parse(value);
   });
};

// do not place before manageEnvironment
const config = {
   // Relative path to templates - String or Array
   path: [_src],
   // Extension for compiled templates, pass null or empty string if you don't want any extension
   ext: '.php',
   // Data passed to template
   data: {},
   // These are options provided for nunjucks Environment
   // More info https://mozilla.github.io/nunjucks/api.html#configure
   envOptions: {
      // escape special html characters
      autoescape: true,
      watch: false,
      tags: {
         //blockStart: '<%',
         //blockEnd: '%>',
         //variableStart: '<$',
         //variableEnd: '$>',
         //commentStart: '<#',
         //commentEnd: '#>'
      },
   },
   // If true, uses same extension that is used for template
   inheritExtension: false,
   // Hook for managing environment before compilation. Useful for adding custom filters, globals, etc
   // https://www.npmjs.com/package/gulp-nunjucks-render#environment
   manageEnv: manageEnvironment,
   // If provided, uses that as first parameter to Environment constructor. Otherwise, uses provided path
   loaders: null,
};

// js-beautify config for formatting built HTML
const formatHtml = {
   html: {
      // Initial indentation level [0]
      indent_level: 0,
      indent_char: ' ',
      indent_size: 3,
      indent_with_tabs: false,
      preserve_newlines: true,
      // Number of line-breaks to be preserved in one chunk [10]
      max_preserve_newlines: 1,
      end_with_newline: true,
      // JS in HTML
      js: {
         indent_size: 3,
      },
      // CSS in HTML
      css: {
         indent_size: 3,
      },
   },
};

exports.files = files;
exports.config = config;
exports.formatHtml = formatHtml;
