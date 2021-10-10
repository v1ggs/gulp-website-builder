// gulp-website-builder
const gwsap = require("./gulp-wsb");

// main task - all modules \\
exports.default = gwsap.run;

// *** required *** \\
// *** don't use *** \\
exports.watch = gwsap.watch;
