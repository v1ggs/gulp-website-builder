/* ***************  S V G   S P R I T E S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const assets = _fn.dist.assets;
/* *************************************************** */

const config = {
   // sprites (objects)
   // copy-paste a sprite to create a new one,
   // then modify its name and options
   sprites: {
      icons: {
         // string
         // svg filenames become <symbol> IDs
         src: proj.dirs.src.icons + '/svg/sprites/**/*.svg',

         // string or array
         // full path(s), with filenames as well
         dest: [
            // either include the file in browser, for caching
            assets + '/icons/svg/sprites/sprite-icons.svg',
            // or inline it during html build
            proj.dirs.src.html + '/svg/sprite-icons.njk',
         ],

         // boolean
         // remove <?xml ?> and DOCTYPE from svg
         removeDocType: true,
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
         { name: 'preset-default' },
         // 'removeViewBox', // uncomment to use
         'removeTitle', // comment to disable
         'removeDesc', // comment to disable
      ],
   },
};

exports.config = config;
