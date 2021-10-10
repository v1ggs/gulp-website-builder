/* ***************  F I L E   C O P Y   C O N F I G  *************** */

// CONFIG
const config = {
   build: {
      cleanDist: true, // delete output dirs
   },

   // folders in the src dir to be copied to the dist dir
   folders: [
      'fonts',
      'sounds',
      'videos',
   ],
}

exports.config = config;