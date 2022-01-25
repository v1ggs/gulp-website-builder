// ================ P R O J E C T   C O N F I G ================ \\

const config = {
   project: {
      // project name
      name: 'IgorVracar.com',
      // project description
      description: 'Web design and Front-end IgorVracar.com',
      // project domain WITHOUT 'https://www.'
      domain: 'igorvracar.com',
   },

   build: {
      // environment: 'dev' or 'prod'
      // dev does not minify css and js, displays console logs, creates sourcemaps, does not add developer header in css and js etc.
      env: 'dev',
      // build type: 1: static page, 2: design with WordPress
      type: 2,
      // if type === 1 - serve page file
      // string (e.g. 'index.html')
      serve: 'index.html',
      // if type === 2 - to be able to stream CSS or reload page on HTML/JS save, proxy local WordPress site, e.g. dev-yourdomain.com (with xampp or similar local server, because browsersync can not serve php files)
      // string (domain) or false
      proxy: 'dev-igorvracar.com',
      // make sound on task completion
      signalEnd: true,
   },

   dirname: {
      // source files folder name (not path)
      source: 'src',
      // dist folder name (not path)
      dist: 'assets',
      // site's root folder name (folder on server exposed to the internet, not the project's root)
      // public_html, htdocs etc.
      public_html: 'public_html',
   },
}

const dirs = {
   // source folders
   src: {
      root: './' + config.dirname.source,
      html: './' + config.dirname.source + '/nunjucks',
      scss: './' + config.dirname.source + '/scss',
      javascript: './' + config.dirname.source + '/js',
      images: './' + config.dirname.source + '/img',
      icons: './' + config.dirname.source + '/icons',
   },
}

// (string | false)
const files = {
   // cachebust file (json file with modification times)
   cachebust: dirs.src.html + '/config/cachebust.json',

   // SCSS files that contains small, blurred SVG placeholder images as SCSS variables
   placeholdersLarge: dirs.src.scss + '/base/_placeholders-large.scss',
   placeholdersSmall: dirs.src.scss + '/base/_placeholders-small.scss',
}

exports.config = config;
exports.dirs = dirs;
exports.files = files;
