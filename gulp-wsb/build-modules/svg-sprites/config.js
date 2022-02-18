/* ***************  S V G   S P R I T E S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const textDomain = _fn.makeTextDomain(proj.config.project.name);
const assets = _fn.serverCfg(textDomain).assetsDist;
/* *************************************************** */

const config = {
   // sprites (objects)
   // duplicate a sprite to create a new one, then modify name and options
   sprites: {
      icons: {
         // string
         // svg filenames become <symbol> IDs
         src: proj.dirs.src.icons + '/svg/sprites/**/*.svg',

         // string or array
         // full path(s), with filenames as well
         dest: [
            assets + '/icons/svg/sprites/sprite-icons.svg',
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
         { name: 'preset-default', active: true },
         { removeViewBox: false },
         { removeTitle: true },
         { removeDesc: true },
      ],
   },
};

exports.config = config;
