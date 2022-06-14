/* ***************  J S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const _src = proj.dirs.src.javascript;
const _dist = _fn.dist.assets;
/* *************************************************** */

const files = {
   // files to watch for changes and build todos/fixmes file
   watch: [_src + '/**/*.js'],
   // output folder
   output: _dist + '/js',
};

// CONFIG
const config = {
   build: {
      cleanDist: true, // clean output dir
      minify: true, // minify files (can be slow, better use only in production)
   },

   // ADD OR REMOVE BUNDLES AS REQUIRED
   // BUNDLE NAME (KEY) IS FILE NAME
   // files will be concatenated in the same order as in the src array
   // a bundle will be created for each bundles.type (each value in the array)
   // "unknonwn" or "['']" or "false|null|undefined" type will produce untranspiled bundle
   // bundle filenames get suffix from transpilation type, except for 'default'
   bundles: {
      vendor: {
         // what comments to keep in a minified file {string}
         // 'important' | 'all' | 'none'
         comments: 'important',

         // transpilation config (config.transpilation.<type>)
         // {array | false|null|undefined}
         // array of keys from config.transpilation, for all required transpilations:
         // e.g.: ['default', 'modulesSupport']
         // 'false|null|undefined' for untranspiled
         type: false,

         // {array} src files, *** order will be respected ***
         src: [
            _src + '/libs/**/*.js',
            _src + '/plugins/**/*.js',
            _src + '/vendor/**/*.js',
         ],

         // {string | false|null|undefined}
         // make dir in the dist (dir name, no slashes)
         outDir: false,
      },

      main: {
         // what comments to keep in a minified file {string}
         // 'important' | 'all' | 'none'
         comments: 'none',

         // transpilation config (config.transpilation.<type>)
         // {array | false|null|undefined}
         // array of keys from config.transpilation, for all required transpilations:
         // e.g.: ['default', 'modulesSupport']
         // 'false|null|undefined' for untranspiled
         type: ['default', 'modulesSupport'],

         // {array} src files, *** order will be respected ***
         src: [
            _src + '/main.js',
            _src + '/core/**/*.js',
            _src + '/components/**/*.js',
         ],

         // {string | false|null|undefined}
         // make dir in the dist (dir name, no slashes)
         outDir: false,
      },
   },

   // Transpilation name (key) is the filename suffix,
   // except for the 'default', which goes without suffix.
   transpilation: {
      // These are being used in config.bundles.<bundle_name>.type array
      default: {
         compact: false, // a kind of minify
         presets: [
            [
               '@babel/env',
               {
                  modules: 'auto',
                  targets: [
                     '> 0.5%',
                     'last 2 versions',
                     'firefox esr',
                     'not dead',
                  ],
               },
            ],
         ],
      },

      // rename as required (e.g. es6)
      modulesSupport: {
         compact: false, // a kind of minify
         presets: [
            [
               '@babel/env',
               {
                  modules: 'auto',
                  targets: [
                     // support modules by default
                     // https://caniuse.com/?search=modules
                     'Chrome >= 61',
                     'Safari >= 11',
                     // 'Safari >= 10.1',
                     'iOS >= 11',
                     // 'iOS >= 10.3',
                     'Firefox >= 60',
                     'Edge >= 16',
                     'Opera >= 48',
                  ],
               },
            ],
         ],
      },

      // rename as required (e.g. es5)
      noModulesSupport: {
         compact: false, // a kind of minify
         presets: [
            [
               '@babel/env',
               {
                  modules: 'auto',
                  targets: [
                     // do not support modules at all
                     // https://caniuse.com/?search=modules
                     'Chrome <= 59',
                     'Safari <= 10',
                     // 'Safari <= 10.1',
                     'iOS <= 10',
                     // 'iOS <= 10.3',
                     'Firefox <= 53',
                     'Edge <= 14',
                     'Opera <= 46',
                  ],
               },
            ],
         ],
      },
   },
};

exports.files = files;
exports.config = config;
