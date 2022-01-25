/* ***************  S C S S   C O N F I G  *************** */

/* *************************************************** */
// import project config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const _src = proj.dirs.src;
const _dist = _fn.serverCfg().assetsDist;
/* *************************************************** */

// CONFIG
const config = {
   build: {
      // clean output dir before build (boolean)
      cleanDist: true,
      // what css comments to keep: ('none' | 'important' | 'first' | 'all')
      keepComments: 'important',
      // use autoprefixer (boolean)
      prefix: true,
      // (boolean)
      // remove unused selectors with purgecss (see purgecss config below)
      purge: true,
      // combine and sort media queries: (false | 'mobile-first' | 'desktop-first')
      combineMQ: 'desktop-first',
      // fix flex bugs (boolean)
      fixFlexbugs: true,
      // minify files (boolean)
      minify: true,
   },

   files: {
      // source files
      src: [
         _src.scss + '/main.scss',
         _src.scss + '/pages/**/*.scss',
         _src.scss + '/themes/**/*.scss',
      ],

      // files to watch for changes and build todos/fixmes file
      watch: [
         _src.scss + '/**/*.scss',
         // these placeholders are built when proccesing images
         // don't build css on any change in images
         '!' + proj.files.placeholdersLarge,
         '!' + proj.files.placeholdersSmall,
      ],

      // css output dir
      output: _dist + '/css',
   },

   // ******************* P L U G I N S ******************* \\

   // purgecss (remove unused selectors)
   purgecss: {
      // reference files (searches in them for the selectors to keep)
      // mind node_modules folder (exclude it)
      analyze: [
         _src.html + '/**/*.html',
         _src.html + '/**/*.njk',
         _src.javascript + '/**/*.js',
      ],

      // choose what selectors to always keep
      safelisting: {
         // matching selectors will be left in the final CSS
         standard: [],
         // matching selectors and their children will be left in the final CSS
         deep: [/-is-open$/, /-is-visible$/, /-is-hidden$/],
         // selectors whose any part matches will be left in the final CSS
         greedy: [
            // /--/, // all BEM modifiers
         ],
         // keep animations
         keyframes: [],
         // keep variables
         variables: [],
      },

      // Blocklist will block the CSS selectors from appearing in the final output CSS. The selectors will be removed even when they are seen as used by PurgeCSS.
      blocklist: [],

      // If you are using a CSS animation library such as animate.css, you can remove unused keyframes by setting the keyframes option to true.
      keyframes: true,

      // If there are any unused @font-face rules in your css, you can remove them by setting the fontFace option to true.
      fontface: true,
   },

   // https://www.npmjs.com/package/autoprefixer
   autoprefixer: {
      // overrideBrowserslist (array): list of queries for target browsers.
      // IF USING .browserslistrc, COMMENT THIS OUT COMPLETELY
      overrideBrowserslist: [
         '>0.5%',
         'last 10 versions',
         'not dead',
         'not OperaMini all',
         'not ie <=11',
      ],

      // grid: (false|'autoplace'|'no-autoplace')) - will enable - ms - prefixes for Grid Layout including some limited autoplacement support
      // Autoprefixer will only autoplace grid cells if both grid-template-rows and grid-template-columns has been set. If grid-template or grid-template-areas has been set, Autoprefixer will use area based cell placement instead.
      grid: false,

      // cascade (boolean): should Autoprefixer use Visual Cascade, if CSS is uncompressed. Default: true
      // won't have effect if using a formatter later
      cascade: false,
   },

   // postcss-inline-svg - include svg files, inline them in css
   // https://www.npmjs.com/package/postcss-inline-svg
   // use svgo (below) to minify them
   inlineSvg: {
      // Array of paths where svgs can be found. Paths are tried in order, until an existing file is found.
      paths: [_src.images + '/inline-svg', _src.images + '/test-svg'],
      // removes all fill attributes before applying specified. Default: false
      removeFill: false,
      // removes all stroke attributes before applying specified. Default: false
      removeStroke: false,
      // Adds xmlns attribute to SVG if not present. Default: true
      xmlns: true,
   },

   // postcss-svgo
   svgo: {
      // If true, it will encode URL-unsafe characters such as <, > and &; false will decode these characters, and undefined will neither encode nor decode the original input. Note that regardless of this setting, # will always be URL-encoded.
      encode: true,
      // Optionally, you can customise the output by specifying the plugins option. You will need to provide the config in comma separated objects. https://github.com/svg/svgo/tree/master/plugins
      plugins: [
         // https://github.com/svg/svgo#configuration
         { name: 'preset-default' },
         // Enable builtin plugin not included in preset
         // 'moreBuiltinPlugin',
         // https://github.com/svg/svgo#built-in-plugins
      ],
   },

   // https://www.npmjs.com/package/postcss-flexbugs-fixes
   fixFlexbugs: {
      // You can also disable bugs individually, possible keys bug4, bug6 and bug8a.
      // bug6: false,
   },

   // https://www.npmjs.com/package/doiuse
   // uses config.autoprefixer.overrideBrowserslist
   doiuse: {
      // an optional array of features to ignore e.g. 'rem'
      ignore: [],
      // an optional array of file globs to match against original source file path, to ignore
      ignoreFiles: ['**/normalize.scss'],
   },
};

exports.config = config;
