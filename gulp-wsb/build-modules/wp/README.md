# WORDPRESS MODULE

---

> **FOR GULP 4**\
> **TESTED ON WINDOWS - NODE.JS 14**

---

## GNU GENERAL PUBLIC LICENSE

> **YOU DO NOT HAVE TO LICENSE SITES OR THEMES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE.**
>
> THIS LICENSE IS FOR DERIVATIVE SOFTWARE, LIKE A MODIFIED VERSION OF THIS SOFTWARE OR A SOFTWARE THAT INCLUDES THIS CODE OR ITS PARTS.

---

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar with the node modules it uses.
>
> If you're familiar with Gulp and JavaScript then it's very easy for you to add new modules or modify modules behaviour.
>
> Try not to modify any other but `config.js` files, unless you know what you are doing.
>
> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript. Almost everything is configurable.
>
> If you're developing with WordPress, you have to have a local WordPress site (with local server, like XAMPP) to proxy it with browsersync, because browsersync can't serve php. The settings for that are made automatically, just edit the project and wp config.
>
> Use TODOs like: `TODO:` or `FIXME:` in an appropriate comment (ex: // TODO: change this), to get all todos and fixmes in a .txt file in the root dir.\
> Read more at: <https://www.npmjs.com/package/gulp-todo>

---

## FEATURES

-  :information_source: unzip automatically [underscores theme template](https://underscores.me)
-  :information_source: :information_source: replace placeholder slug and text-domain automatically, in all files, if using a placeholder theme
-  theme is initialised automatically - directory, index.php, screenshot placeholder and style.css
-  copy files to the destination on any file change
-  :warning: concatenate files
-  populate all TODOs and FIXMEs from .php files into LOG-TODO-WP.txt, in the project root
-  update [humans.txt](https://humanstxt.org/) on each build

> :information_source: If you want to use underscores starter theme, then download it first, place it into the wordpress source dir, make all required configurations, and then run gulp. It will be unzipped and all config done automatically.
>
> :information_source: :information_source: Placeholder theme would be a theme that is created once, and used for all projects, with some particular name, which is used as theme slug and text domain placeholder which is easy to replace whithout errors.\
> It is always a good idea to download a new starter theme for each new project, because they maintain (update) it.
>
> :warning: **Concatenation removes all occurences of `<?php` and `?>` from each file. They will be prepended/appended to each produced file, which makes this option useful only for files that contain only php code.**
>
> If you have many functions or filters in functions.php, which may also be documented (// commented) for usage, configuration, source info, potential issues etc., then you can get a very long file, which is difficult to manage.\
> That is the reason for this option, which at first looks usless with PHP.\
> This way you can split code in smaller files (which you just add or remove from the folder) and concatenate them, to avoid unneccessary server side includes.

---

## USAGE

-  First create [Underscores starter theme](https://underscores.me) - name it whatever you want.
-  Download it and copy the zip file to the wp source folder. Don't rename it, its filename is used to get some data for the config.
-  Edit project and wordpress config files.
-  Start gulp from the console. Everything is configured automatically.

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

---

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules'.

---

## LICENSE

> **YOU DO NOT HAVE TO LICENSE SITES OR THEMES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE.**
>
> THIS LICENSE IS FOR DERIVATIVE SOFTWARE, LIKE A MODIFIED VERSION OF THIS SOFTWARE OR A SOFTWARE THAT INCLUDES THIS CODE OR ITS PARTS.

---

GNU GENERAL PUBLIC LICENSE V3.0

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

Permissions:

-  Commercial use
-  Modification
-  Distribution
-  Patent use
-  Private use

Limitations:

-  No Liability
-  No Warranty

Conditions:

-  License and copyright notice
-  State changes
-  Disclose source
-  Same license

---

## COPYRIGHT

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

---
