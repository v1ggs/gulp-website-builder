// gulp-website-builder
const gwsb = require('./.gulp-wsb');

// main task - all modules \\
exports.default = gwsb.run;

// *** required *** \\
// *** don't use *** \\
exports.watch = gwsb.watch;
