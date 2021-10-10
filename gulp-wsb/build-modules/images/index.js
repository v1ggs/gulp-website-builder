// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const build = config.config.build;
const format = config.config.formats;
const imgSizes = config.config.sizes;
const files = config.files;

// Gulp
const sharp = require('sharp');
const svgmin = require('gulp-svgmin');


// ============== S E T T I N G S ============== \\
// set options using settings from main config
const sharpResizeOptions = function (size) {
    let options = {
        width: size.width,
        fit: size.fit,
        position: size.position,
        background: size.background,
    }

    // if height is specified, use it (it can't be false, like in config)
    if (size.height) {
        options.height = size.height;
    }

    return options;
}


// ============== F U N C T I O N S ============== //
// console info about the running task
const consoleInfo = function (cb) {
    console.log('========== TASK: IMAGES');

    cb();
}


// delete the output folder
const cleanDist = function (cb) {
    if (build.cleanDist) { _fn.rem(files.dist, cb); }

    cb();
}


// write humans.txt
const humans = function (cb) {
    let humans = _fn.humansTxt();

    if (humans.check) { _fn.writeFile(humans.file, humans.content); }

    cb();
}


// make dir if not exist - pass path to file or dir
const mkdir = function (path, cb) {
    let p, pathObj = _fn.path.parse(path);

    if (pathObj.ext) {
        p = pathObj.dir;
    } else {
        p = pathObj.dir + '/' + pathObj.name + '/';
    }

    if (!_fn.fs.existsSync(p)) {
        _fn.fs.mkdir(p, { recursive: true }, (err) => {
            if (err) { console.log(err); }
        });
    }

    cb();
}


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
}


// rotate by exif, resize with sharpResizeOptions()
const sharpResize = function (sharpInstance, options) {
    return sharpInstance
        // The use of rotate implies the removal of the EXIF Orientation tag, if any.
        // If no angle is provided, it is determined from the EXIF data.
        // Mirroring is supported and may infer the use of a flip operation.
        .rotate()
        .resize(options);
}


// compress images using settings from main config
const sharpCompress = function (sharpInstance, ext) {
    if (ext === '.jpg' || ext === '.jpeg') {
        return sharpInstance.jpeg(format.jpg);

    } else if (ext === '.png') {
        return sharpInstance.png(format.png);

    } else if (ext === '.webp') {
        return sharpInstance.webp(format.webp);
    }
}


// output file
const sharpOutput = function (sharpInstance, filename, dir) {
    return sharpInstance
        .toFile(dir + '/' + filename)
        .catch((err) => { if (err) { console.log(err); } });
}


// svg template
const makeSvg = function (width, height, href) {
    // https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
    return svgFile = '<svg xmlns="http://www.w3.org/2000/svg" ' +
        'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
        'width="' + width + '" height="' + height + '" ' +
        'viewBox="0 0 ' + width + ' ' + height + '">' +
        '<filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">' +
        '<feGaussianBlur stdDeviation="20 20" edgeMode="duplicate" />' +
        '<feComponentTransfer>' +
        '<feFuncA type="discrete" tableValues="1 1" />' +
        '</feComponentTransfer>' +
        '</filter>' +
        '<image filter="url(#blur)" xlink:href="' + href +
        '" x="0" y="0" height="100%" width="100%" /></svg>';
}


// create small placeholder image, blurred with an svg filter, base64 encoded
// and use it as background (scss file)
// explained on css tricks:
// https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
// placeholder(source, imgMetadata, pathObject, scssFile, svgQuality, svgSize, callback)
async function placeholder(sharpInstance, meta, pathObj, appendToFile, q, s, cb) {
    // process image and then get all the data from it (promise)
    let smallImgObj = await sharpInstance
        // The use of rotate implies the removal of the EXIF Orientation tag, if any.
        // If no angle is provided, it is determined from the EXIF data.
        // Mirroring is supported and may infer the use of a flip operation.
        .rotate()
        .jpeg({ quality: q, progressive: false, normalise: false, density: 72, optimiseCoding: true, chromaSubsampling: '4:2:0', force: true })
        .resize({ width: 40 })
        // Resolve the Promise with an Object containing data and info properties instead of resolving only with data.
        .toBuffer({ resolveWithObject: true })
        .then(function (img) {
            return img; // return the image data and info
        });

    // get original metadata (for svg dimensions, for correct aspect ratio)
    let originalImgMetadata = await meta;

    // parent folder name for svg variable name in scss
    let parentFolder = _fn.path.relative(proj.dirs.src.images, pathObj.dir);

    // create filename
    let filename = (pathObj.name + pathObj.ext);
    filename = filename.replace(/\.|_| /gi, '-');
    filename = filename.replace(
        /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi, ''
    ).toLowerCase();

    // path for info in comments
    let fullFilePath = pathObj.dir + '/' + filename;

    // encode image to base64
    let imgBase64 = smallImgObj.data.toString('base64');

    // format to use in svg href
    let imgFormat = smallImgObj.info.format;

    // size in bytes for developer info
    let imgSize = smallImgObj.info.size;

    // original width for svg
    let imgW = originalImgMetadata.width;

    // original height for svg
    let imgH = originalImgMetadata.height;

    // make svg href
    let svgHref = 'data:image/' + imgFormat + ';base64,' + imgBase64;

    // make svg
    let svgFile = makeSvg(imgW, imgH, svgHref);

    /* https://codepen.io/yoksel/details/JDqvs/
    We can use SVG in CSS via data URI, but without encoding it works only in Webkit based browsers. If encode SVG using encodeURIComponent() it will work everywhere.
    SVG must have attribute xmlns like this: xmlns='http://www.w3.org/2000/svg'. */
    let svgEnc = encodeURIComponent(svgFile);

    // image size for scss mixin name
    let scssVarSuffix; if (s === 's') { scssVarSuffix = '-small'; }
    else if (s === 'l') { scssVarSuffix = '-large'; } else { scssVarSuffix = ''; }

    // create a name for scss variable, prefixed (svg-b64-) for autocomplete
    let scssVarName = '$svg-b64-' + parentFolder + '-' + filename + scssVarSuffix;

    // css comment with image info for the developer
    let cssComments =
        '// Original file: "' + fullFilePath + '"\n' +
        '// ' + imgFormat + ' size: ' + imgSize + ' bytes\n';

    // create scss variable
    let scssContent = cssComments + scssVarName + ': ' +
        'url(data:image/svg+xml;charset=utf-8,' + svgEnc + ');\n\n';

    /*
    let svgExportDir = files.svgDist;

    _fn.rem(svgExportDir, false);
    mkdir(svgExportDir);

    // write svg to be able to open them in browser
    writeDataIntoFile(`${svgExportDir}/${nameBase}.svg`, svgFile, 'w');
    */

    // write data
    appendToFile.write(scssContent);

    cb();
}


// initialize the scss file
const initializeScss = function (cb) {
    // data to write
    let data = '// technique explained on css tricks:\n// https://css-tricks.com/the-blur-up-technique-for-loading-background-images/\n\n// Import this file in your main.scss to be able to use these variables, like:\n// background-image: $svg-b46-some-img-jpg-small;\n\n';

    // parse path to get dir
    let dest = _fn.path.parse(proj.files.svgPlaceholders);

    // make dir
    mkdir(dest.dir, cb);

    // open file for writing - flags: 'a' - append, 'w' - write
    let stream = _fn.fs.createWriteStream(proj.files.svgPlaceholders, { flags: 'w' });

    // write data
    stream.write(data);
    stream.end(); // not required

    cb();
}


// svg files
const processSvg = function (cb) {
    let svgs = _fn.src(files.svg, { base: proj.dirs.src.images, allowEmpty: true })
        .pipe(svgmin(format.svg))
        .pipe(_fn.dest(files.dist));

    // signal completion to gulp
    cb();
}


// process all image sizes
async function processSizes(sharpInstance, imgMeta, sizesArr, suffixesArr, file, cb) {
    // parse path to each file
    let filePath = _fn.path.parse(file);

    // img parent folder
    let parentFolder = _fn.path.relative(proj.dirs.src.images, filePath.dir);

    // get path to each file, relative to img dir
    let newDir = files.dist + '/' + parentFolder;

    // create destination folder, if not there
    mkdir(newDir, cb);

    // display the file being processed
    console.log('========== Processing image: ' + filePath.name + filePath.ext);

    // img metadata
    let metadata = await imgMeta;

    // number of sizes
    let numOfSizes = sizesArr.length;

    for (let i = 0; i < numOfSizes; i++) {
        // if doNotEnlarge true and required size is larger then the original image
        if (build.doNotEnlarge && sizesArr[i].width > metadata.width) {
            // set original image width
            sizesArr[i].width = metadata.width;
        }

        // create new filename with the size suffix
        let newFilename = filePath.name.replace(
            /\!|\@|\#|\$|\%|\^|\&|\(|\)|\+|\=|\[|\]|\{|\}|\'|\"|\,/gi, ''
        );
        newFilename = newFilename.replace(/\.|_| /gi, '-');
        newFilename = (newFilename + '-' + suffixesArr[i] + filePath.ext).toLowerCase();

        // get processing options - dimensions, crop, fit... (object)
        let options = sharpResizeOptions(sizesArr[i]);

        // rotate image (by EXIF), then resize, crop, fit
        let resizeImg = sharpResize(sharpInstance, options);

        // compress
        let compressImg = sharpCompress(resizeImg, filePath.ext);

        // output
        let outputFile = sharpOutput(compressImg, newFilename, newDir);
    }

    cb();
}


// jpg, jpeg, png, webp files
const main = function (cb) {

    // create folder
    mkdir(files.dist, cb);

    // initialize the scss file if required
    if (build.svgPlaceholders) {
        initializeScss(cb);
    }

    // get all image filename suffixes
    let suffixes = Object.keys(imgSizes);

    // get all image sizes
    let sizes = Object.values(imgSizes);

    // get all images
    let sourceFiles = _fn.glob.sync(files.src);

    // scss file for svg placeholders
    let appendToFile;
    if (build.svgPlaceholders) {
        // open file for writing - flags: 'a' - append, 'w' - write
        appendToFile = _fn.fs.createWriteStream(proj.files.svgPlaceholders, { flags: 'a' });
    }

    // process each file
    sourceFiles.forEach(function (file) {
        // parse path to each file
        let filePath = _fn.path.parse(file);

        // get file with sharp
        let sharpInstance = sharpGetFile(file);

        // get image metadata - handle in async function (returns a promise)
        let imgMeta = sharpInstance.metadata();

        // process and output all image sizes
        processSizes(sharpInstance, imgMeta, sizes, suffixes, file, cb);

        // create placeholder image if required
        // placeholder(source, imgMetadata, pathObject, scssFile, svgQuality, svgSize, callback)
        if (build.svgPlaceholders) {
            placeholder(sharpInstance, imgMeta, filePath, appendToFile, 94, 'l', cb); // large
            placeholder(sharpInstance, imgMeta, filePath, appendToFile, 36, 's', cb); // small
        }

    });

    // signal completion to gulp
    cb();
}


// the complete process
exports.build = _fn.series(
    consoleInfo,
    cleanDist,
    _fn.parallel(main, processSvg, humans),
    _fn.endSound,
);

// Source files to watch for changes with watch()
exports.watch = [files.src, files.svg];
