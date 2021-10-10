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

// nunjucks globals - set here and use across .njk files as variables or filters
const manageEnvironment = function (environment) {
   // ------------ global variables ------------ \\
   environment.addGlobal('projectName', proj.config.project.name);
   environment.addGlobal('domain', 'https://www.' + proj.config.project.domain);
   environment.addGlobal('description', proj.config.project.description);
   environment.addGlobal('title', proj.config.project.name);
   environment.addGlobal('sep', ' | '); // title separator
   // use as variable in .njk files, like: {{ assets }}/css/style.min.css
   environment.addGlobal('assets', assets);

   // ------------ custom filters ------------ \\
   // get array from a space separated string
   environment.addFilter('split', function (string) {
      var txt = string.split(" ");
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
}

const files = {
   // src files to build
   src: [_src + '/pages/*.{njk,nj,nunjucks}'],
   // files to watch for changes and build todos/fixmes file
   watch: [_src + '/**/*.{njk,nj,nunjucks}'],
   // output
   output: _dist,
}

// do not place before manageEnvironment
const config = {
   // Relative path to templates - String or Array
   path: [_src],
   // Extension for compiled templates, pass null or empty string if you don't want any extension
   ext: '.html',
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
}

// js-beautify config for formatting built HTML
const formatHtml = {
   "html": {
      // Initial indentation level [0]
      "indent_level": 0,
      "indent_char": " ",
      "indent_size": 3,
      "indent_with_tabs": false,
      "preserve_newlines": true,
      // Number of line-breaks to be preserved in one chunk [10]
      "max_preserve_newlines": 1,
      "end_with_newline": true,
      // JS in HTML
      "js": {
         "indent_size": 3
      },
      // CSS in HTML
      "css": {
         "indent_size": 3
      }
   },
}

exports.files = files;
exports.config = config;
exports.formatHtml = formatHtml;