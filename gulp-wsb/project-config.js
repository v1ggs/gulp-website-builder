// ================ P R O J E C T   C O N F I G ================ \\

const config = {
   project: {
      // project name
      name: 'Example Dot Com',
      // project description
      description: 'Web design and front-end for WordPress',
      // project domain without 'https://www.'
      domain: 'example.com',
   },

   build: {
      // environment: 'dev' | 'prod'
      env: 'dev',
      // build type: 1: static page, 2: design for WordPress
      type: 1,
      // serve page (for server, when developing for WP: index.html, category.html ...)
      serve: 'index.html',
      // make sound on task completion
      signalEnd: true,
   },

   dirname: {
      // folder name (not path) for source files
      source: 'src',
      // dist folder name (not path)
      dist: 'assets',
      // folder name on server exposed to the internet (not project's but site's root)
      public_html: 'htdocs',
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
   },
}

// (string | false)
const files = {
   // cachebust file (json file with modification times)
   cachebust: dirs.src.root + '/cachebust.json',

   // SCSS file that contains small, blurred SVG placeholder images as SCSS variables
   svgPlaceholders: dirs.src.scss + '/base/_placeholders.scss',
}

exports.config = config;
exports.dirs = dirs;
exports.files = files;
