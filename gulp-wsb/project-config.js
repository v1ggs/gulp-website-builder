// ================ P R O J E C T   C O N F I G ================ \\

const config = {
   project: {
      // project name
      name: 'IgorVracar.com',
      // project description
      description: 'Web design and Front-end IgorVracar.com',
      // project domain without 'https://www.'
      domain: 'igorvracar.com',
   },

   build: {
      // environment: 'dev' | 'prod'
      env: 'dev',
      // build type: 1: static page, 2: design for WordPress
      type: 1,
      // serve file (e.g. 'index.html') or proxy a domain (local dev, e.g. dev-yourdomain.com), if type === 3
      serve: 'index.html',
      // proxy a domain, e.g. dev-yourdomain.com (local WordPress),
      // to be able to inject CSS/JS, and stream/reload page on save
      // default: false
      proxy: 'dev-igorvracar.com',
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
