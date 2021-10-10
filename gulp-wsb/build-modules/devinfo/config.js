/* ***************  F I L E   C O P Y   C O N F I G  *************** */

// imports
const proj = require('../../project-config').config.project;

// CONFIG
const config = {
   // processed only when "config.build.env: 'prod'" in project-config.js
   build: {
      // (boolean) prepend dev header to processed files
      header: true,
      // create humans.txt - https://humanstxt.org
      humans: true,
   },

   // developer(s) header content for CSS and JS
   header: `/* Designer/Developer: vIGGS | https://www.igorvracar.com */\n`,

   // humans.txt content
   humans:
      `/* TEAM */\n` +
      `     Web Designer/Developer/WordPress: vIGGS\n` +
      `     Location: Banja Luka, Bosnia and Herzegovina\n` +
      `     Website: https://www.igorvracar.com\n` +
      `     Github: https://github.com/v1ggs\n\n` +
      `/* SITE */\n` +
      `     Name: ${proj.name}\n` +
      `     Description: ${proj.description}\n` +
      `     Domain: ${proj.domain}\n` +
      `     Language: English\n` +
      `     Built With: HTML5 (Nunjucks), CSS3 (SCSS), JavaScript, jQuery, WordPress\n` +
      `     Software: VSCode, Gulp (task runner), Filezilla\n` +
      `     Last Update: `, // the 'last update' time is created programmatically.
}

exports.config = config;