/* ***************  W O R D P R E S S   T H E M E   C O N F I G  *************** */

/* *************************************************** */
// project config
const proj = require('../../project-config.js');
// src dir
const _src = proj.dirs.src.wordpress;
/* *************************************************** */

const files = {
   // array
   // copy these files
   // use negative globs to exclude ('!**/*.ext)
   copy: [
      _src + '/**/*.php',
      _src + '/**/*.pot',
      _src + '/_config/cachebust.json',
   ],
};

const underscores = {
   // use underscores starter theme (extract the downloaded zip file)
   use_s: true,
   // if placeholder: true, it will replace placeholder theme_slug and
   // text-domain with those created from our theme name (const theme.name)
   // if we're using a generic theme, set true
   // if we're using a theme created for this particular job, set false
   placeholder: true,
};

// All Items: string
// Items indicated with (*) are required for a theme in the WordPress Theme Repository.
// https://developer.wordpress.org/themes/basics/main-stylesheet-style-css/
const theme = {
   // Theme name, Description and Text Domain are created programatically
   // ===================================================================
   // The URL of a public web page where users can find more information about the theme.
   uri: '',
   // author (*): The name of the individual or organization who developed the theme. Using the Theme Author’s wordpress.org username is recommended.
   author: 'vIGGS (Igor Vračar)',
   // Author URI: The URL of the authoring individual or organization.
   authorUri: 'https://www.igorvracar.com',
   // Version (*): The version of the theme, written in X.X or X.X.X format.
   version: '1.0.0',
   // Requires at least (*): The oldest main WordPress version the theme will work with, written in X.X format. Themes are only required to support the three last versions.
   requiresAtLeast: '',
   // Tested up to (*): The last main WordPress version the theme has been tested up to, i.e. 5.4. Write only the number, in X.X format.
   testedUpTo: '',
   // Requires PHP (*): The oldest PHP version supported, in X.X format, only the number
   requiresPHP: '',
   // License (*): The license of the theme.
   license: '',
   // License URI (*): The URL of the theme license.
   licenseURI: '',
   // Tags: Words or phrases that allow users to find the theme using the tag filter. A full list of tags is in the Theme Review Handbook.
   tags: '',
   // Domain Path: Used so that WordPress knows where to find the translation when the theme is disabled. Defaults to /languages.
   domainPath: '',
};

exports.files = files;
exports.underscores = underscores;
exports.theme = theme;
