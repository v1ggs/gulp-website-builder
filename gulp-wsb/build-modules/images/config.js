/* ***************  I M A G E S   C O N F I G  *************** */

/* *************************************************** */
// import config
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const _src = proj.dirs.src.images;
const _dist = _fn.serverCfg().assetsDist;
/* *************************************************** */

const files = {
   src: _src + '/**/*.{jpg,jpeg,png,webp}',
   svg: _src + '/svg/*.svg',
   dist: _dist + '/img',
}

const config = {
   build: {
      // clean output dir
      cleanDist: true,
      // if false - remove metadata from images
      keepMetadata: false,
      // if true - will not enlarge images
      doNotEnlarge: true,
      // SCSS file that contains small, blurred SVG placeholder images as SCSS variables
      svgPlaceholders: true,
   },


   sizes: {
      // Add a size by duplicating and modifying an existing one
      // remove unnecessary sizes
      // size (key) is filename suffix
      // Settings info: https://sharp.pixelplumbing.com/api-resize
      small: {
         width: 480, // set false for auto width (define height)
         height: false, // set false for auto height (define width), otherwise use fit
         fit: 'cover', // cover, contain, fill, inside or outside (default 'cover')
         position: 'centre', // position/gravity/strategy, when fit is cover or contain
         background: { r: 0, g: 0, b: 0, alpha: 1 }, // background when using fit:contain
      },

      medium: {
         width: 1280, // set false for auto width (define height)
         height: false, // set false for auto height (define width), otherwise use fit
         fit: 'cover', // cover, contain, fill, inside or outside (default 'cover')
         position: 'centre', // position/gravity/strategy, when fit is cover or contain
         background: { r: 0, g: 0, b: 0, alpha: 1 }, // background when using fit:contain
      },

      large: {
         width: 1920, // set false for auto width (define height)
         height: false, // set false for auto height (define width), otherwise use fit
         fit: 'cover', // cover, contain, fill, inside or outside (default 'cover')
         position: 'centre', // position/gravity/strategy, when fit is cover or contain
         background: { r: 0, g: 0, b: 0, alpha: 1 }, // background when using fit:contain
      },
   },


   formats: {
      jpg: {
         quality: 80, // quality, integer 1-100 (optional, default 80)
         progressive: true, // use progressive (interlace) scan (optional, default false)
         optimiseCoding: true, // optimise Huffman coding tables (optional, default true)
         normalise: false, // Enhance output image contrast by stretching its luminance to cover the full dynamic range. Boolean (optional, default true)
         chromaSubsampling: '4:2:0', // default '4:4:4'
         density: 72, // default 72
      },

      png: {
         compressionLevel: 9, // zlib compression level, 0 (fastest, largest) to 9 (slowest, smallest) (optional, default 6)
         progressive: true, // use progressive (interlace) scan (optional, default false)
         normalise: false, // Enhance output image contrast by stretching its luminance to cover the full dynamic range. Boolean (optional, default true)
      },

      webp: {
         quality: 80, // quality, integer 1-100 (optional, default 80)
         normalise: false, // Enhance output image contrast by stretching its luminance to cover the full dynamic range. Boolean (optional, default true)
         lossless: false, // use lossless compression mode (optional, default false)
         nearLossless: false, // use near_lossless compression mode (optional, default false)
         alphaQuality: 100, // quality of alpha layer, integer 0-100 (optional, default 100)
         reductionEffort: 4, // level of CPU effort to reduce file size, integer 0-6 (optional, default 4)
      },

      // https://www.npmjs.com/package/gulp-svgmin
      svg: {
         // Ensures the best optimization
         multipass: true,
         js2svg: {
            // Beutifies the SVG output instead of stripping all white space
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
   },
}


exports.files = files;
exports.config = config;
