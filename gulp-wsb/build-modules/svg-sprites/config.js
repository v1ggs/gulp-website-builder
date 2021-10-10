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
      // sprite source files (string | array)
      // svg filenames become <symbol> IDs, so no two files should have the same filename
      // sprite name (key) is sprite's filename
      'sprite-1': [_src + '/svg/sprites/**/*.svg', _src + '/svg/test/**/*.svg'],
      'test-sprite': _src + '/svg/sprites-2/**/*.svg',
   },

   // output folder
   output: _dist + '/svg-sprites',

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
         { removeTitle: false },
         { removeDesc: true },
      ],
   },
}


exports.config = config;
