// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const _fn = require('../../common-fn');
const proj = require('../../project-config');
const config = require('./config.js').config;
const _dist = _fn.serverCfg().assetsDist;


// ============== F U N C T I O N S ============== \\
// console info about the running task
const consoleInfo = function (cb) {
    console.log('========== TASK: FILECOPY');

    cb();
}


// delete the output folder
const cleanDist = function (cb) {
    const folders = config.folders;

    for (let i = 0, foldersNo = folders.length; i < foldersNo; i++) {
        // check out the config
        if (config.build.cleanDist) {
            if (_fn.fs.existsSync(_dist + '/' + folders[i])) {
                _fn.del.sync([_dist + '/' + folders[i]]);
            }
        }
    }

    cb();
}


const copyFiles = function (cb) {
    // src({ base: }) - copy relative to the base dir
    let filecopy = _fn.src(config.folders, { base: proj.dirs.src.root, allowEmpty: true })
        .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
        .pipe(_fn.dest(_dist));

    cb();
}


exports.filecopy = _fn.series(consoleInfo, cleanDist, copyFiles, _fn.endSound);
exports.watch = config.folders;