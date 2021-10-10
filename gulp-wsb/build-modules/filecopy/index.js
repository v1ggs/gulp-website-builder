// ********* DO NOT MODIFY THIS FILE UNLESS IT'S NECESSARY ************ \\
// ********* FIND ALL SETTINGS IN THE CONFIG FILE ********************* \\

// imports
const _fn = require('../../common-fn');
const proj = require('../../project-config');
const config = require('./config.js').config;
const _dist = _fn.serverCfg().assetsDist;


// ============== F U N C T I O N S ============== \\
// delete the output folder
const cleanDist = function (cb) {
    const a_folders = config.folders;

    for (let i = 0, n_foldersNo = a_folders.length; i < n_foldersNo; i++) {
        // check out the config
        if (config.build.cleanDist) {
            if (_fn.fs.existsSync(_dist + '/' + a_folders[i])) {
                _fn.del.sync([_dist + '/' + a_folders[i]]);
            }
        }
    }

    cb();
}

const copyFiles = function (cb) {
    let a_allDirs = [];
    let n_allDirsNo = config.folders.length;

    for (let i = 0; i < n_allDirsNo; i++) {
        a_allDirs[i] = proj.dirs.src.root + '/' + config.folders[i] + '/**/*';
    }

    // src({ base: }) - copy relative to the base dir
    let filecopy = _fn.src(a_allDirs, { base: proj.dirs.src.root, allowEmpty: true })
        .pipe(_fn.plumber({ errorHandler: _fn.errHandler }))
        .pipe(_fn.dest(_dist));

    cb();
}

// create full path for folders from config (for watch task)
const foldersArray = function () {
    let a_allDirs = [];
    let n_allDirsNo = config.folders.length;

    for (let i = 0; i < n_allDirsNo; i++) {
        a_allDirs[i] = proj.dirs.src.root + '/' + config.folders[i] + '/**/*';
    }

    return a_allDirs;
}

const watchFolders = foldersArray();


exports.filecopy = _fn.series(cleanDist, copyFiles, _fn.endSound);
exports.watch = watchFolders;