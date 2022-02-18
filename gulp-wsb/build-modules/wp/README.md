# WORDPRESS MODULE

---

> **_FOR GULP 4_**

---

> **_TESTED ON WINDOWS - NODE.JS 14_**

---

## GNU GENERAL PUBLIC LICENSE

> **_YOU DO NOT HAVE TO LICENSE SITES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE._**
> THIS LICENSE IS FOR DERIVATIVE SOFTWARE, LIKE A MODIFIED VERSION OF THIS SOFTWARE OR A SOFTWARE THAT INCLUDES THIS CODE OR ITS PARTS.

---

## GENERAL INFO

> If you want to use this repository it is required that you're familiar with Gulp and Javascript.
> It is also recommended that you're familiar with the node modules it uses.

---

> If you're developing with WordPress, you have to have a local WordPress site (with local server, like XAMPP) to proxy it with browsersync, because browsersync can't serve php. The settings for that are made automatically, just edit the project and wp config.

---

> Try not to modify any other but `config.js` files, unless you know what you are doing.

## Features

-  unzip automatically [underscores theme template](https://underscores.me)
-  replace placeholder slug and text-domain automatically, in all files, if required
-  theme is initialised automatically - create theme folder, index.php, screenshot placeholder and style.css
-  copy files to the destination on any file change
-  concatenate files (see :information_source: below)
-  populate all TODOs and FIXMEs from .php files into LOG-TODO-WP.txt, in the project root
-  update [humans.txt](https://humanstxt.org/) on each build
-  notification on plugin errors (so you don't have to keep the console open)
-  sound on task completion (so you don't have to keep the console open)

> :information_source: If you have many functions or filters that go into functions.php, that could also be documented (// commented) for usage, potential issues etc., then you can get a very long file, that is difficult to manage.\
> That is the reason I created this option, that at first looks usless with PHP. This way you can split code in smaller files and concatenate them, to avoid unneccessary server side includes.

---

> :warning: **Concatenation removes all occurences of `<?php` and `?>` from each file. They will be prepended/appended to each produced file, which makes this option useful only for files that contain only php code.**

## USAGE

-  First create [Underscores starter theme](https://underscores.me) - name it whatever you want.
-  Download it and copy the zip file to the wp source folder. Don't rename it, its filename is used to get some data for the theme.
-  Edit project and wordpress config files.
-  Start gulp from the console. Everything is configured automatically.

---

> Configuration files (`config.js`) are commented for explanations, which should be fine for most people familiar with Gulp and JavaScript.

## INSTALLATION

### Required node modules

Required node modules: 'General Node Modules'.

## Copyright

**© 2021 [Igor Vračar](https://www.igorvracar.com)**

## License

**_GNU GENERAL PUBLIC LICENSE_**

> **_YOU DO NOT HAVE TO LICENSE SITES MADE WITH THIS SOFTWARE WITH THIS SAME LICENSE, OF COURSE._**
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
