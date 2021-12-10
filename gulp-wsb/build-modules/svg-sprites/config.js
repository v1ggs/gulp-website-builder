/* ***************  S V G   S P R I T E S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
// assets root dir
const assets = _fn.serverCfg().assetsDist;
/* *************************************************** */

const config = {
   // sprites (objects)
   sprites: {
      icons: {
         // string
         // svg filenames become <symbol> IDs, so no two files should have the same filename
         src: proj.dirs.src.icons + '/svg/sprites/**/*.svg',
         // string or array
         // full path(s), with filenames as well
         dest: [
            assets + '/icons/svg/sprites/sprite-icons.svg',
            proj.dirs.src.html + '/svg/sprite-icons.njk',
         ],
      },
   },

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
