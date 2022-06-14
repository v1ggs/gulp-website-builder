// ================ P R O J E C T   C O N F I G ================ \\

const config = {
   project: {
      // project name
      // if working with wordpress, this will be used to
      // create theme name, text domain and theme slug
      name: 'Igor Vracar Personal Web Site',

      // project description
      // if working with wordpress, this will be theme description
      description: 'Web design, Front-end and WordPress for igorvracar.com',

      // project's (site's) domain
      domain: 'https://www.igorvracar.com',
   },

   build: {
      // environment: 'dev' or 'prod'
      // 'prod' removes js console logs in minified files, does not make doiuse and todo logs,
      // does not create sourcemaps, adds developer header in css and js
      env: 'dev',

      // build type:
      // 'static': static page | 'wp': design with WordPress
      type: 'wp',

      // {string} (e.g. 'index.html')
      // (if type: 'static') serve a file you want to preview in browser
      serve: 'index.html',

      // if type: 'wp' or output file is php:
      // to be able to preview and reload a page in browser
      // and stream CSS, you have to proxy a local WordPress site,
      // e.g. dev-yourdomain.com (with a local server, like xampp),
      // because browsersync can not serve php files
      // type: string (domain) or undefined (default)
      proxy: undefined,

      // provide certificate to use https or set false
      // example:
      //    key: 'C:/xampp/mkcert-ssl/localhost-key.pem',
      //    cert: 'C:/xampp/mkcert-ssl/localhost.pem',
      key: false,
      cert: false,

      // Override host detection:
      // if you know the correct IP to use (e.g. '192.168.44.88')
      // use this IP in your browser (you must be connected to the internet)
      // Default: null
      ip: null,

      // make sound on every task completion
      // including changing gulp config
      signalEnd: true,
   },

   // these are folder names
   dirname: {
      // source folder name (not path) where
      // all source files are
      source: 'src',

      // dist folder name (not path) where all
      // processed assets go (css, js, images etc.)
      dist: 'assets',

      // site's root folder name (folder on server exposed to the
      // internet, not the project's root): public_html, htdocs etc.
      public_html: 'public_html',

      // dist folder name (not path) where all
      // logs will go (todos, doiuse)
      log: '.log',
   },
};

// these are full paths
const dirs = {
   // site's (not project's) root
   siteRoot: './' + config.dirname.public_html,

   // source folders
   src: {
      root: './' + config.dirname.source,
      html: './' + config.dirname.source + '/nunjucks',
      scss: './' + config.dirname.source + '/scss',
      javascript: './' + config.dirname.source + '/js',
      images: './' + config.dirname.source + '/img',
      icons: './' + config.dirname.source + '/icons',
      wordpress: './' + config.dirname.source + '/wp',
   },

   // output dirs are configured programatically, depending on the config.build.type
   // just set "config.dirname.dist" and "config.dirname.public_html" properly
};

// (string | false)
const files = {
   // cachebust file (json file with modification times)
   cachebust: dirs.src.html + '/config/cachebust.json',

   // SCSS files that contain small, blurred SVG placeholder images as SCSS variables
   // https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
   placeholdersLarge: dirs.src.scss + '/base/_placeholders-large.scss',
   placeholdersSmall: dirs.src.scss + '/base/_placeholders-small.scss',

   // humans.txt file (https://humanstxt.org)
   humansTxt: dirs.siteRoot + '/humans.txt',
};

const developerInfo = {
   // processed only when "config.build.env: 'prod'" in project-config.js
   build: {
      // (boolean) prepend dev header to processed files
      header: true,
      // create humans.txt file (https://humanstxt.org)
      humans: true,
   },

   // developer(s) header content for CSS and JS, if build.header is true.
   // you can also add license info here
   header: `/* Designer/Developer: vIGGS | https://www.igorvracar.com */\n`,

   // humans.txt content (if developerInfo.build.humans is true)
   humans:
      `/* AUTHOR */\n` +
      `     Web Design/Front-end/WordPress: vIGGS (Igor Vračar)\n` +
      `     Location: Banja Luka, Bosnia and Herzegovina\n` +
      `     Website: https://www.igorvracar.com\n` +
      `     Github: https://github.com/v1ggs\n` +
      `     Soundcloud: https://soundcloud.com/v1ggs\n` +
      `     Flickr: https://www.flickr.com/photos/--viggs--/\n` +
      `     Lichess: https://lichess.org/@/Iggz\n\n` +
      `/* SITE */\n` +
      `     Name: ${config.project.name}\n` +
      `     Description: ${config.project.description}\n` +
      `     Domain: ${config.project.domain}\n` +
      `     Launched: 2020\n` +
      `     Standards: HTML5, CSS3\n` +
      `     Language: English\n` +
      `     Built With: HTML5 (Nunjucks), CSS3 (SCSS), JavaScript (vanilla), PHP, WordPress, .htaccess\n` +
      `     Software: VSCode, Gulp (task runner), Filezilla\n` +
      // the 'last update' time is created programmatically.
      // To change its time format, find humansTxt function and edit
      // content variable, in the common-fn index.js file.
      `     Last Update: `,
};

exports.config = config;
exports.dirs = dirs;
exports.files = files;
exports.developerInfo = developerInfo;
