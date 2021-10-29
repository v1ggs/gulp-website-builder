/* ***************  S V G   S P R I T E S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const _src = proj.dirs.src.root;
const _dist = _fn.serverCfg().assetsDist;
/* *************************************************** */

const config = {
   sprites: {
      // sprite source files (string)
      // svg filenames become <symbol> IDs, so no two files should have the same filename
      // sprite name (key) is sprite's filename
      'main-sprite': _src + '/img/svg/sprites/**/*.svg',
      'icons-sprite': _src + '/icons/svg/sprites/**/*.svg',
   },

   // output folder
   // files will be exported relative to the source root
   output: _dist,

   // https://www.npmjs.com/package/gulp-svgmin
   minification: {
      // Ensures the best optimization
      multipass: true,
      // beutify SVG
      js2svg: {
         pretty: false,
         indent: 2,
      },

      plugins: [
         // https://github.com/svg/svgo#configuration
         // https://github.com/svg/svgo#built-in-plugins
         { name: 'preset-default', active: true },
         { removeViewBox: false, },
         { removeTitle: true },
         { removeDesc: true },
      ],
   },
}


exports.config = config;
