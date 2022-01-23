// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const build = config.config.build;
const format = config.config.formats;
const imgSizes = config.config.sizes;

// Gulp
const sharp = require('sharp');
const svgmin = require('gulp-svgmin');

// ============== S E T T I N G S ============== \\
// set options using settings from main config
let sharpResizeOptions = function (size) {
   let options = {
      width: size.width,
      fit: size.fit,
      position: size.position,
      background: size.background,
   };

   // if height is specified, use it (it can't be false, like in config)
   if (size.height) {
      options.height = size.height;
   }

   return options;
};

// ============== F U N C T I O N S ============== //
// console info about the running task
const consoleInfo = function (cb) {
   console.log('========== TASK: IMAGES');

   cb();
};

// delete the output folder
const cleanDist = function (cb) {
   if (build.cleanDist) {
      _fn.rem(config.files.dist, cb);
   }

   cb();
};

// write humans.txt
const humans = function (cb) {
   let humans = _fn.humansTxt();

   if (humans.check) {
      _fn.writeFile(humans.file, humans.content);
   }

   cb();
};

// Create a cacheBust file
// Its content is appended to the src url as a query
const cacheBust = function (cb) {
   _fn.cacheBust('images');

   cb();
};

// make dir if not exist - pass path to file or dir
const mkdir = function (path) {
   let p,
      pathObj = _fn.path.parse(path);

   if (pathObj.ext) {
      p = pathObj.dir;
   } else {
      p = pathObj.dir + '/' + pathObj.name + '/';
   }

   if (!_fn.fs.existsSync(p)) {
      return _fn.fs.mkdirSync(p, { recursive: true }, (err) => {
         if (err) {
            console.log(err);
         }
      });
   }

   return;
};

// get file with sharp
const sharpGetFile = function (file) {
   // get file
   let sharpInstance = sharp(file, {
      // by default halt processing and raise an error when loading invalid images. Set this flag to false if you'd rather apply a "best effort" to decode images, even if the data is corrupt or invalid. (optional, default true)
      failOnError: false,
   });

   // keep metadata in the processed image, if set so
   if (build.keepMetadata) {
      sharpInstance = sharpInstance.withMetadata();
   }

   return sharpInstance;
};

// prepare file with sharp
const sharpPrepareFile = function (sharpInstance, quality) {
   // The use of rotate implies the removal of the EXIF Orientation tag, if any.
   // If no angle is provided, it is determined from the EXIF data.
   // Mirroring is supported and may infer the use of a flip operation.
   return (
      sharpInstance
         .rotate()
         .jpeg({
            quality: quality,
            progressive: false,
            normalise: false,
            density: 72,
            optimiseCoding: true,
            chromaSubsampling: '4:2:0',
            force: true,
         })
         .resize({ width: 40 })
         // Resolve the Promise with an Object containing data and info properties instead of resolving only with data.
         .toBuffer({ resolveWithObject: true })
         .then(function (img) {
            return img; // return the image data and info
         })
   );
};

// rotate by exif, resize with sharpResizeOptions()
const sharpResize = function (sharpInstance, options) {
   return (
      sharpInstance
         // The use of rotate implies the removal of the EXIF Orientation tag, if any.
         // If no angle is provided, it is determined from the EXIF data.
         // Mirroring is supported and may infer the use of a flip operation.
         .rotate()
         .resize(options)
   );
};

// compress images using settings from main config
const sharpCompress = function (sharpInstance, ext) {
   if (ext === '.jpg' || ext === '.jpeg') {
      return sharpInstance.jpeg(format.jpg);
   } else if (ext === '.png') {
      return sharpInstance.png(format.png);
   } else if (ext === '.webp') {
      return sharpInstance.webp(format.webp);
   }
};

// output file
const imgFileName = function (pathObj, suffix) {
   // create new filename with the size suffix
   let newFilename = pathObj.name.replace(
      /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi,
      ''
   );
   newFilename = newFilename.replace(/\.|_| /gi, '-');
   newFilename = (newFilename + suffix + pathObj.ext).toLowerCase();

   return newFilename;
};

// svg template
const makeSvg = function (width, height, href) {
   // https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
   return (svgFile =
      "<svg xmlns='http://www.w3.org/2000/svg' " +
      "xmlns:xlink='http://www.w3.org/1999/xlink' " +
      "width='" +
      width +
      "' height='" +
      height +
      "' " +
      "viewBox='0 0 " +
      width +
      " " +
      height +
      "'>" +
      "<filter id='blur' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>" +
      "<feGaussianBlur stdDeviation='20 20' edgeMode='duplicate' />" +
      "<feComponentTransfer>" +
      "<feFuncA type='discrete' tableValues='1 1' />" +
      "</feComponentTransfer>" +
      "</filter>" +
      "<image filter='url(#blur)' xlink:href='" +
      href +
      "' x='0' y='0' height='100%' width='100%' /></svg>");
};

// initialize the scss file
const initializeScss = function (file, _map) {
   // data to write
   let data = `// technique explained on css tricks:\n// https://css-tricks.com/the-blur-up-technique-for-loading-background-images/\n\n// Import this file in your main.scss to be able to use these SVGs, like:\n// background-image: map-get($svg-b64-large-placeholders, "some-img-#{$i}-small-jpg");\n\n${_map}: (\n`;

   return _fn.writeFile(file, data);
};

// create small placeholder image, blurred with an svg filter, base64 encoded
// and use it as background (scss file)
// explained on css tricks:
// https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
async function placeholdersLarge(cb) {
   // initialize the scss file if required
   if (build.svgPlaceholders) {
      if (proj.files.placeholdersLarge) {
         initializeScss(
            proj.files.placeholdersLarge,
            '$svg-b64-large-placeholders'
         );

         // get all images
         const sourceFiles = _fn.glob.sync(config.files.src);

         // put files into an array
         const filesArray = Array.from(sourceFiles);
         const filesCount = filesArray.length;

         // process each file
         for (let i = 0; i < filesCount; i++) {
            // parse path to each file
            const filePath = _fn.path.parse(filesArray[i]);

            // get file with sharp
            const sharpInstance = sharpGetFile(filesArray[i]);

            // get original metadata (for svg dimensions, for correct aspect ratio)
            const metadata = await sharpInstance.metadata();

            // process image and then get all the data from it (promise)
            const placeholderObj = await sharpPrepareFile(sharpInstance, 94);

            // parent folder name for map key in scss
            const parentFolder = _fn.path
               .relative(proj.dirs.src.images, filePath.dir)
               // clean path for usage in map key
               .replace(/\\|\/| |_/gi, '-')
               .replace(
                  /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi,
                  ''
               )
               .toLowerCase();

            // create clean filename
            const filename = (filePath.name + filePath.ext)
               .replace(/\.|_| /gi, '-')
               .replace(
                  /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi,
                  ''
               )
               .toLowerCase();

            // path for info in comments
            let fullFilePath = filePath.dir + '/' + filename;

            // encode image to base64
            let imgBase64 = placeholderObj.data.toString('base64');

            // format to use in svg href
            let imgFormat = placeholderObj.info.format;

            // size in bytes for developer info
            let imgSize = placeholderObj.info.size;

            // original width for svg
            let imgW = metadata.width;

            // original height for svg
            let imgH = metadata.height;

            // make svg href
            let svgHref = 'data:image/' + imgFormat + ';base64,' + imgBase64;

            // make svg
            let svgFile = makeSvg(imgW, imgH, svgHref);

            /* https://codepen.io/yoksel/details/JDqvs/
                We can use SVG in CSS via data URI, but without encoding it works only in Webkit based browsers. If encode SVG using encodeURIComponent() it will work everywhere.
                SVG must have attribute xmlns like this: xmlns='http://www.w3.org/2000/svg'. */
            let svgEnc = encodeURIComponent(svgFile);

            // create a name for scss map key, prefixed (svg-b64-) for autocomplete
            let scssMapKey = '"' + parentFolder + '-' + filename + '"';

            // css comment with image info for the developer
            let cssComments =
               '// Original file: "' +
               fullFilePath +
               '"\n' +
               '// ' +
               imgFormat +
               ' size: ' +
               imgSize +
               ' bytes\n';

            // info comment and map key
            let scssContent =
               cssComments +
               scssMapKey +
               ': ' +
               'url("data:image/svg+xml;charset=utf-8,' +
               svgEnc +
               '"),\n\n';

            _fn.fs.appendFileSync(proj.files.placeholdersLarge, scssContent);

            /*
                // EXPORT REAL SVG FILES
                // to be able to open them in browser
                let svgExportDir = config.files.dist + '/svg';
                mkdir(svgExportDir);
                _fn.fs.writeFileSync(`${svgExportDir}/${filename}.svg`, svgFile);
                */
         }

         // finalise scss file
         _fn.fs.appendFileSync(proj.files.placeholdersLarge, ');');
      }
   }

   cb();
}

async function placeholdersSmall(cb) {
   // initialize the scss file if required
   if (build.svgPlaceholders) {
      if (proj.files.placeholdersSmall) {
         initializeScss(
            proj.files.placeholdersSmall,
            '$svg-b64-small-placeholders'
         );

         // get all images
         const sourceFiles = _fn.glob.sync(config.files.src);

         // put files into an array
         const filesArray = Array.from(sourceFiles);
         const filesCount = filesArray.length;

         // process each file
         for (let i = 0; i < filesCount; i++) {
            // parse path to each file
            const filePath = _fn.path.parse(filesArray[i]);

            // get file with sharp
            const sharpInstance = sharpGetFile(filesArray[i]);

            // get original metadata (for svg dimensions, for correct aspect ratio)
            const metadata = await sharpInstance.metadata();

            // process image and then get all the data from it (promise)
            const placeholderObj = await sharpPrepareFile(sharpInstance, 36);

            // parent folder name for map key in scss
            const parentFolder = _fn.path
               .relative(proj.dirs.src.images, filePath.dir)
               // clean path for usage in map key
               .replace(/\\|\/| |_/gi, '-')
               .replace(
                  /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi,
                  ''
               )
               .toLowerCase();

            // create clean filename
            const filename = (filePath.name + filePath.ext)
               .replace(/\.|_| /gi, '-')
               .replace(
                  /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi,
                  ''
               )
               .toLowerCase();

            // path for info in comments
            let fullFilePath = filePath.dir + '/' + filename;

            // encode image to base64
            let imgBase64 = placeholderObj.data.toString('base64');

            // format to use in svg href
            let imgFormat = placeholderObj.info.format;

            // size in bytes for developer info
            let imgSize = placeholderObj.info.size;

            // original width for svg
            let imgW = metadata.width;

            // original height for svg
            let imgH = metadata.height;

            // make svg href
            let svgHref = 'data:image/' + imgFormat + ';base64,' + imgBase64;

            // make svg
            let svgFile = makeSvg(imgW, imgH, svgHref);

            /* https://codepen.io/yoksel/details/JDqvs/
                We can use SVG in CSS via data URI, but without encoding it works only in Webkit based browsers. If encode SVG using encodeURIComponent() it will work everywhere.
                SVG must have attribute xmlns like this: xmlns='http://www.w3.org/2000/svg'. */
            let svgEnc = encodeURIComponent(svgFile);

            // create a name for scss map key, prefixed (svg-b64-) for autocomplete
            let scssMapKey = '"' + parentFolder + '-' + filename + '"';

            // css comment with image info for the developer
            let cssComments =
               '// Original file: "' +
               fullFilePath +
               '"\n' +
               '// ' +
               imgFormat +
               ' size: ' +
               imgSize +
               ' bytes\n';

            // info comment and map key
            let scssContent =
               cssComments +
               scssMapKey +
               ': ' +
               'url("data:image/svg+xml;charset=utf-8,' +
               svgEnc +
               '"),\n\n';

            _fn.fs.appendFileSync(proj.files.placeholdersSmall, scssContent);
         }

         // finalise scss file
         _fn.fs.appendFileSync(proj.files.placeholdersSmall, ');');
      }
   }

   cb();
}

// svg files
const processSvg = function (cb) {
   // get all exclude folders
   let exclude = config.files.exclude;
   let excludeCount = exclude.length;

   // src files array
   let srcFiles = [];
   srcFiles[0] = config.files.svg;

   // get exclude folders, and place them into the array
   for (let i = 0; i < excludeCount; i++) {
      srcFiles.push('!' + exclude[i]);
   }

   let svgs = _fn
      .src(srcFiles, { base: proj.dirs.src.images, allowEmpty: true })
      .pipe(svgmin(format.svg))
      .pipe(_fn.dest(config.files.dist));

   // signal completion to gulp
   cb();
};

// process all image sizes
async function processSizes(cb) {
   // get all image filename suffixes
   const suffixes = Object.keys(imgSizes);

   // get all image sizes
   const sizes = Object.values(imgSizes);
   const sizesCount = sizes.length;

   // get all images
   const sourceFiles = _fn.glob.sync(config.files.src, {
      ignore: config.files.exclude,
   });

   // put files into an array
   const filesArray = Array.from(sourceFiles);
   const filesCount = filesArray.length;

   // process each file
   for (let i = 0; i < filesCount; i++) {
      // parse path to each file
      const filePath = _fn.path.parse(filesArray[i]);

      // get file with sharp
      const sharpInstance = sharpGetFile(filesArray[i]);

      // image metadata
      const metadata = await sharpInstance.metadata();

      // img parent folder
      const parentFolder = _fn.path.relative(
         proj.dirs.src.images,
         filePath.dir
      );

      // get path to each file, relative to img dir
      const newDir = config.files.dist + '/' + parentFolder;

      // create destination folder, if not there
      mkdir(newDir);

      // prevent overwritting files when original size is
      // smaller than requested, and no enlarge enabled
      let lastFilePath = '';

      // display the file being processed
      console.log(
         '========== Processing image: ' +
            filePath.dir +
            '/' +
            filePath.name +
            filePath.ext
      );

      for (let j = 0; j < sizesCount; j++) {
         // processing options - dimensions, crop, fit... (object)
         let options = sharpResizeOptions(sizes[j]);

         // new filename suffix
         let suffix = '-' + suffixes[j];

         // if doNotEnlarge true and required size is larger then the original image
         if (build.doNotEnlarge && sizes[j].width > metadata.width) {
            // set original image width
            options.width = metadata.width;
            suffix = '';
         }

         // new filename
         const newFileName = imgFileName(filePath, suffix);

         if (newDir + '/' + newFileName == lastFilePath) {
            // prevent overwritting files when original size is
            // smaller than requested, and no enlarge enabled
            // console.log('========== skip file: ' + newDir + '/' + newFileName);
         } else {
            // set new file path
            lastFilePath = newDir + '/' + newFileName;

            // rotate image (by EXIF), then resize, crop, fit
            const resizeImg = sharpResize(sharpInstance, options);

            // compress and output
            sharpCompress(resizeImg, filePath.ext).toFile(
               newDir + '/' + newFileName,
               (err, info) => {
                  // console.log(info);
                  if (err) {
                     console.log(err);
                  }
               }
            );
         }
      }
   }

   cb();
}

// files array for watcher
const watcher = function () {
   // get all exclude folders
   let exclude = config.files.exclude;
   let excludeCount = exclude.length;

   // watch files array
   let watchFiles = [];
   watchFiles[0] = config.files.src;
   watchFiles[1] = config.files.svg;

   // get exclude folders, and place them into the array
   for (let i = 0; i < excludeCount; i++) {
      watchFiles.push('!' + exclude[i]);
   }

   return watchFiles;
};

// the complete process
exports.build = _fn.series(
   consoleInfo,
   cleanDist,
   _fn.parallel(
      processSizes,
      processSvg,
      placeholdersLarge,
      placeholdersSmall,
      humans,
      cacheBust
   ),
   _fn.endSound
);

// Source files to watch for changes with watch()
exports.watch = watcher();
