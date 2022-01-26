// ================ P R O J E C T   C O N F I G ================ \\

const config = {
   project: {
      // project name
      name: 'Igor Vracar Personal Web Site',
      // project description
      description: 'Web design and Front-end igorvracar.com',
      // project domain WITHOUT 'https://www.'
      domain: 'igorvracar.com',
   },

   // set if developing a wordpress theme, otherwise not important
   // all: string | false
   wpThemeInfo: {
      themeFolderName: 'igorvracar.com',
      authorName: 'vIGGS (Igor Vračar)',
      authorUrl: 'https://www.igorvracar.com',
      themeVersion: 'v1',
   },

   build: {
      // environment: 'dev' or 'prod'
      // dev does not minify css and js, displays console logs, creates sourcemaps, does not add developer header in css and js etc.
      env: 'prod',
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
   },

   // output dirs are configured programatically, depending on the config.build.type
   // just set config.dirname.dist and config.dirname.public_html properly
}

// (string | false)
const files = {
   // cachebust file (json file with modification times)
   cachebust: dirs.src.html + '/config/cachebust.json',

   // SCSS files that contains small, blurred SVG placeholder images as SCSS variables
   placeholdersLarge: dirs.src.scss + '/base/_placeholders-large.scss',
   placeholdersSmall: dirs.src.scss + '/base/_placeholders-small.scss',

   // humans.txt file (https://humanstxt.org)
   humansTxt: dirs.siteRoot + '/humans.txt',
}

const developerInfo = {
   // processed only when "config.build.env: 'prod'" in project-config.js
   build: {
      // (boolean) prepend dev header to processed files
      header: true,
      // create humans.txt - https://humanstxt.org
      humans: true,
   },

   // developer(s) header content for CSS and JS, if build.header === true
   // you can add the license info here
   header: `/* Designer/Developer: vIGGS | https://www.igorvracar.com */\n`,

   // humans.txt content, if build.humans === true
   humans:
      `/* AUTHOR */\n` +
      `     Web Design/Front-end/WordPress: vIGGS\n` +
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
      `     Built With: HTML5 (Nunjucks), CSS3 (SCSS), JavaScript, PHP, WordPress, .htaccess\n` +
      `     Software: VSCode, Gulp (task runner), Filezilla\n` +
      `     Last Update: `, // the 'last update' time is created programmatically. To change time format, edit content variable in humansTxt function, in the common-fn index.js file.
}

exports.config = config;
exports.dirs = dirs;
exports.files = files;
exports.developerInfo = developerInfo;
