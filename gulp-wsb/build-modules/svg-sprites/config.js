/* ***************  S V G   S P R I T E S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const _src = proj.dirs.src.images;
const _dist = _fn.serverCfg().assetsDist;
// svgs root src folder
const _svgs = _src + '/svg/sprites';
/* *************************************************** */

const config = {
   sprites: {
      // sprite source files (string | array)
      // svg filenames become <symbol> IDs, so no two files should have the same filename
      // sprite name (key) is sprite's filename
      'main-sprite': [_svgs + '/main/**/*.svg'],
      'svg-icons': [_svgs + '/icons/**/*.svg'],
   },

   // output folder
   output: _dist + '/img/svg/sprites',

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
