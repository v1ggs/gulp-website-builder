// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

const proj = require('../../project-config.js');
const _fn = require('../../common-fn');
const config = require('./config.js');
const serverConfig = _fn.dist;
const _dist = serverConfig.html;
// necessary data for the theme
// modified with wpInit()
let allData;

// ============== F U N C T I O N S ============== //
// get necessary data for the theme
const getData = function (path) {
   if (!path) {
      return false;
   }

   // parse file path
   const parsePath = _fn.path.parse(path);
   const zipFilename = parsePath.base;
   // folder inside the zip file
   const zippedDir = parsePath.name;
   // strings to replace
   const replaceTextDomain = _fn.makeTextDomain(zippedDir);
   const replaceThemeSlug = _fn.makeThemeSlug(zippedDir);
   // replace with strings
   const textDomain = _fn.makeTextDomain(proj.config.project.name);
   const themeSlug = _fn.makeThemeSlug(proj.config.project.name);
   // found in the comment at the top of each file
   // e.g. @package Underscores_Starter_Theme
   const replacePackageName = _fn.makeTitleCase(replaceThemeSlug, '_', '_');
   const packageName = _fn.makeTitleCase(themeSlug, '_', '_');
   // found in the comment at the top of functions.php
   const replaceCommentInfo = _fn.makeTitleCase(replaceThemeSlug, '_', ' ');
   const commentInfo = _fn.makeTitleCase(themeSlug, '_', ' ');
   // get server config for this theme
   const serverCfg = _fn.serverCfg(textDomain);

   return (allData = {
      zipFilename: zipFilename,
      replaceTextDomain: replaceTextDomain,
      replaceThemeSlug: replaceThemeSlug,
      textDomain: textDomain,
      themeSlug: themeSlug,
      replacePackageName: replacePackageName,
      packageName: packageName,
      replaceCommentInfo: replaceCommentInfo,
      commentInfo: commentInfo,
   });
};

const unzipUnderscores = function (allData) {
   const filePath = `${proj.dirs.src.wordpress}/${allData.zipFilename}`;
   // get file
   const zipfile = new _fn.admZip(filePath);
   // all files inside the zip file
   const zipEntries = zipfile.getEntries();

   // console info
   console.log('==========');
   console.log('========== EXTRACTING _S:');
   console.log('==========');

   // process each file inside zip
   const extractAndReplaceContent = zipEntries.forEach(function (zipEntry) {
      // get file content as text
      let fileContent = zipfile.readAsText(zipEntry, 'utf8');

      // if selected in config
      if (config.underscores.placeholder) {
         // do all replacements in file content
         fileContent = fileContent
            .replaceAll(allData.replaceThemeSlug, allData.themeSlug)
            .replaceAll(allData.replaceTextDomain, allData.textDomain)
            .replaceAll(allData.replacePackageName, allData.packageName)
            .replaceAll(allData.replaceCommentInfo, allData.commentInfo);
      }

      // remove the zipped folder from path, to be able to extract
      // files in the same dir where the zip file is
      const newpath = zipEntry.entryName
         // replace only the first occurence of the
         // string (folder name) with wp src path
         .replace(allData.replaceTextDomain, `${proj.dirs.src.wordpress}`)
         // then replace all others (filenames) with the text-domain
         .replaceAll(allData.replaceTextDomain, allData.textDomain);

      // Prevent overwriting files, because we could
      // accidentally overwrite already modified files
      // check if file is there
      if (!_fn.fs.existsSync(newpath)) {
         // if file not found, write it
         _fn.writeFile(newpath, fileContent);

         // print all processed files in the console
         console.log('========== ' + newpath);
      }
   });

   // if selected in config
   if (config.underscores.deleteZip) {
      // delete zipfile
      _fn.rem(filePath);
   }
};

// =============== WORDPRESS INDEX, SCREENSHOT AND CSS ================ \\
/* Theme Screenshot
https://codex.wordpress.org/Theme_Development#Screenshot

Create a screenshot for your theme.
The screenshot should be named screenshot.png, and should be placed
in the top level directory. The screenshot should accurately show
the theme design and saved in PNG format. While .jpg, .jpeg, and .gif
are also valid extensions and file formats for the screenshot,
they are not recommended.

The recommended image size is 1200px wide by 900px tall.
The screenshot will usually be shown smaller but the over-sized
image allows for high-resolution viewing on HiDPI displays.
Note that because the Manage Themes screen is responsive,
the top and bottom of the screenshot image might not be viewable
so keep graphics near the center. */
const wpScreenshotContent = function () {
   return `<svg viewbox="0 0 1200 900" width="1200" height="900" xmlns="http://www.w3.org/2000/svg"><style>.screenshot-title, .screenshot-description { display: block; fill: rgb(238, 238, 238); white-space: nowrap; text-anchor: middle; dominant-baseline: middle; }
.screenshot-title { font: bold 80px sans-serif; }
.screenshot-description { font: 28px sans-serif; }
.screenshot-bgd { width: 100%; height: 100%; fill: #112266; stroke: none; }</style>
<rect x="0" y="0" width="1200" height="900" fill="#112266" />
<text x="50%" y="46%" class="screenshot-title">${proj.config.project.name}</text>
<text x="50%" y="54%" class="screenshot-description">${proj.config.project.description}</text></svg>`;
};

// style.css that contains theme info
const wpStyleContent = function (textDomain) {
   // name (*): Name of the theme.
   let content = `Theme Name: ${proj.config.project.name}\n`;
   // Description (*): A short description of the theme.
   content += `Description: ${proj.config.project.description}\n`;

   if (config.theme.uri) {
      content += `Theme URI: ${config.theme.uri}\n`;
   }
   if (config.theme.author) {
      content += `Author: ${config.theme.author}\n`;
   }
   if (config.theme.authorUri) {
      content += `Author URI: ${config.theme.authorUri}\n`;
   }
   if (config.theme.version) {
      content += `Version: ${config.theme.version}\n`;
   }
   if (config.theme.requiresAtLeast) {
      content += `Requires at least: ${config.theme.requiresAtLeast}\n`;
   }
   if (config.theme.testedUpTo) {
      content += `Tested up to: ${config.theme.testedUpTo}\n`;
   }
   if (config.theme.requiresPHP) {
      content += `Requires PHP: ${config.theme.requiresPHP}\n`;
   }
   if (config.theme.license) {
      content += `License: ${config.theme.license}\n`;
   }
   if (config.theme.licenseURI) {
      content += `License URI: ${config.theme.licenseURI}\n`;
   }
   if (config.theme.tags) {
      content += `Tags: ${config.theme.tags}\n`;
   }
   if (config.theme.domainPath) {
      content += `Domain Path: ${config.theme.domainPath}\n`;
   }

   // Text Domain (*): The string used for textdomain for translation.
   content += `Text Domain: ${textDomain}\n`;

   return content;
};

// index.php
const wpIndexContent = function () {
   return `<?php
 echo "Theme Name: ${proj.config.project.name}";
 echo "Description: ${proj.config.project.description}";
 ?>`;
};

// convert svg from above to png and save as a screenshot
// create later a real page screenshot and replace this one with it
const wpScreenshot = async function (allData) {
   const content = wpScreenshotContent();
   const screenshotSvg = _dist + '/screenshot.svg';
   const screenshotPng = _dist + '/screenshot.png';

   _fn.writeFile(screenshotSvg, content);

   try {
      const makeScreenShotPng = await _fn
         .sharp(screenshotSvg, { density: 300 })
         .resize(1200, 900, { fit: 'contain' })
         .toFormat('png')
         .toFile(screenshotPng);

      if (_fn.fs.existsSync(screenshotSvg)) {
         _fn.del.sync([screenshotSvg]);
      }
   } catch (err) {
      console.log('========== Error while creating screenshot.');
      // console.log(err);
   }
};

// write style.css that contains theme info
const wpStyle = function (allData) {
   let content = '/*\n';
   content += wpStyleContent(allData.textDomain);
   content += '*/\n';
   _fn.writeFile(_dist + '/style.css', content);
};

// write index.php
const wpIndex = function (allData) {
   let content = wpIndexContent();
   return _fn.writeFile(_dist + '/index.php', content);
};

// initialise wp theme if developing for wp
// and unzip underscores zip file if required
const wpInit = function () {
   // if we're developing for wp
   if (proj.config.build.type === 'wp') {
      let themeData, zipfile;

      if (
         _fn.fs.existsSync(
            `${_fn.projectRoot}/${proj.dirs.src.wordpress}/_init/theme-data.js`
         )
      ) {
         console.log('==========');
         console.log('========== Theme data file found.');
         themeData = require(`${_fn.projectRoot}/${proj.dirs.src.wordpress}/_init/theme-data.js`);

         // necessary data for the theme
         allData = themeData.data;
      } else if (_fn.glob.sync(`${proj.dirs.src.wordpress}/*.zip`)[0]) {
         console.log('==========');
         console.log('========== Theme zip file found.');

         // get only the first found zip file
         zipfile = _fn.glob.sync(`${proj.dirs.src.wordpress}/*.zip`)[0];
         // necessary data for the theme
         allData = getData(zipfile);

         // extract zip if set in config
         if (config.underscores.use_s) {
            unzipUnderscores(allData);
         }

         // prepare data for theme-data.js
         let content = `const data = {\n`;
         content += `zipFilename: '${allData.zipFilename}',\n`;
         content += `replaceTextDomain: '${allData.replaceTextDomain}',\n`;
         content += `replaceThemeSlug: '${allData.replaceThemeSlug}',\n`;
         content += `textDomain: '${allData.textDomain}',\n`;
         content += `themeSlug: '${allData.themeSlug}',\n`;
         content += `replacePackageName: '${allData.replacePackageName}',\n`;
         content += `packageName: '${allData.packageName}',\n`;
         content += `replaceCommentInfo: '${allData.replaceCommentInfo}',\n`;
         content += `commentInfo: '${allData.commentInfo}',\n`;
         content += `serverConfig: ${JSON.stringify(serverConfig)},\n`;
         content += `}\n`;
         content += `exports.data = data;\n`;

         // write theme-data.js
         _fn.writeFile(
            `${proj.dirs.src.wordpress}/_init/theme-data.js`,
            content
         );
      } else {
         console.log('==========');
         console.log('========== Theme Data and theme zip file not found.');
         return false;
      }

      // make theme basic files if they do not exist
      if (!_fn.fs.existsSync(_dist + '/index.php')) {
         console.log('==========');
         console.log('========== Index.php not found.');
         console.log('========== Creating it...');
         wpIndex(allData);
      }

      if (!_fn.fs.existsSync(_dist + '/screenshot.png')) {
         console.log('==========');
         console.log('========== Screenshot.png not found.');
         console.log('========== Creating it...');
         wpScreenshot(allData);
      }

      if (!_fn.fs.existsSync(_dist + '/style.css')) {
         console.log('==========');
         console.log('========== Style.css not found.');
         console.log('========== Creating it...');
         wpStyle(allData);
      }
   }
};

exports.wpInit = wpInit;

// ============================ TASKS
// TASK console info about the running task
const consoleInfo = function (cb) {
   console.log('==========');
   console.log('========== TASK: WORDPRESS');
   console.log('==========');

   cb();
};

// TASK write humans.txt
const humans = function (cb) {
   let humans = _fn.humansTxt();

   if (humans.check) {
      _fn.writeFile(humans.file, humans.content);
   }

   cb();
};

// TASK create todos
const todos = function (cb) {
   let srcFiles = [];

   if (_fn.todoCheck()) {
      config.files.copy.forEach((path) => {
         // exclude extensions that break todos
         let srcPath = path.replace(/\.json|\.jsonc|\.pot/gi, '.remove');

         // if extension removed, do not push into the src array
         if (srcPath.slice(-7) !== '.remove') {
            srcFiles.push(srcPath);
         }
      });

      return _fn
         .src(srcFiles, { allowEmpty: true })
         .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
         .pipe(
            _fn.gulptodo({
               fileName: 'LOG-TODO-WP.txt',
               absolute: false, // write filenames relative to project root
            })
         )
         .pipe(_fn.dest('.'));
   }

   cb();
};

// TASK concatenate files
// WARNING: this will remove all occurences of '<?php' and '?>' in each file
// they will be prepended/appended once to each produced file
const concatenate = function (cb) {
   let fileNames = Object.keys(config.files.concatenate);
   let fileObject = Object.values(config.files.concatenate);
   let filesCount = fileNames.length;

   // for each file in concatenate config
   for (let i = 0; i < filesCount; i++) {
      let content = '<?php\n';

      // get all files with glob.sync - returns array
      let processFiles = _fn.glob
         .sync(fileObject[i].src)
         // process each file from node's glob.sync
         .forEach((file) => {
            // read file's text content
            let fileContent = _fn.fs.readFileSync(file, 'utf8');
            fileContent =
               // append new line to each file
               (fileContent + '\n')
                  // remove '<?php' and '?>' from content
                  .replaceAll(/\<\?php|\?\>/gi, '')
                  // remove multiple new lines
                  .replace(/(\r\n|\r|\n){2,}/g, '\n');
            // remove last occurence of '?>' in content
            // fileContent = fileContent.replace(/\?\>([^?>]*)$/, '$1');

            // prepend once '<?php\n'
            // then append all subsequent file contents
            content += fileContent;
         });

      // when all processed, append '?>'
      content += '\n?>';

      let filename = fileNames[i] + '.php';
      let outDir = fileObject[i].dest !== '' ? '/' + fileObject[i].dest : '';

      let writeFile = _fn.writeFile(`${_dist}${outDir}/${filename}`, content);
   }

   cb();
};

// TASK main
const main = function () {
   let fileObject = Object.values(config.files.concatenate);
   let exlSrc = [];

   fileObject.forEach((file) => {
      exlSrc.push('!' + file.src);
   });

   let srcFiles = `${config.files.copy.join(',')},${exlSrc.join(',')}`.split(
      ','
   );

   return _fn
      .src(srcFiles, { allowEmpty: true })
      .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
      .pipe(_fn.dest(_dist));
};

// the complete process
exports.build = _fn.series(
   consoleInfo,
   main,
   concatenate,
   _fn.parallel(_fn.reloadPage, humans),
   todos, // todo takes too long (> 1sec) if in parallel with others
   _fn.endSound
);

// source files to watch for changes
exports.watch = config.files.copy;
