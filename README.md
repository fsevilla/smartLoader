smartLoader
===========

smartLoader is an asynchronous JavaScript and CSS loader that helps to improve performance with a very simple and unique implementation.

Built in pure JavaScript, smartLoader is dependency-free, allowing you to load any resources from both relative and absolute locations.

smartLoader **does not** implement the [Asynchronous Module Definition](https://github.com/amdjs/amdjs-api/wiki/AMD) (AMD) API. However, it is a powerful resource to load 'modules' defining dependencies and events that need to be loaded|triggered before loading a specific module. These defintions occur in a single configuration file.

Download
===========

* [smartLoader.js](https://github.com/fsevilla/smartLoader/raw/master/smartLoader.js) (full source)
* [smartLoader.min.js](https://github.com/fsevilla/smartLoader/raw/master/smartLoader.min.js) (minified)

Features
===========

* Custom (pseudo)modular approach
* Groups JS and CSS files into modules
* Built-in events for loading modules
* Define module dependencies
* Set base Url to load files
* Set base element to load files above a specific tag element
* All configuration occurs in a single JavaScript file
* Supports all major browsers

Getting started
===========

smartLoader consists of two JavaScript files. 
* smartLoader source file
* configuration script

These files can be loaded as follows:
```html
<!-- Load smartLoader source file -->
<script src="path/to/smartLoader.js"></script>
<!-- Load configuration script -->
<script src="path/to/config.js"></script>
```

or simply by adding the configuration file to the data-main attribute. 
```html
<!-- Load smartLoader source file with configuration script -->
<script src="path/to/smartLoader.js" data-main="config"></script>
```

The path to 'config' is relative to the path of smartLoader.js. **Note** how the extension .js is missing. smartLoader handles that so you save a few characters from the HTML.



Browser support
===========

* IE 6+
* Firefox 11+
* Safari 5+
* Chrome 3+
* Opera 10+
