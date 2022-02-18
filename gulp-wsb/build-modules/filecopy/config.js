/* ***************  F I L E   C O P Y   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _src = proj.dirs.src.root;
/* *************************************************** */

// CONFIG
const config = {
   build: {
      // delete output dirs (be careful, there might be files created by other tasks)
      cleanDist: false,
   },

   // folders in the src dir to be copied to the dist dir
   // use negative globs to exclude
   folders: [
      _src + '/fonts/**/*',
      _src + '/icons/**/*',
      // processed with svg-sprites module
      '!' + _src + '/icons/svg/**/*',
   ],
};

exports.config = config;
