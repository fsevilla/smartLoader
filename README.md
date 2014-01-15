smartLoader
===========

smartLoader is an asynchronous JavaScript and CSS loader that helps to improve performance with a very simple and unique implementation.

Built in pure JavaScript, smartLoader is dependency-free, allowing you to load any resources from both relative and absolute locations.

smartLoader does not implement the [https://github.com/amdjs/amdjs-api/wiki/AMD](Asynchronous Module Definition(AMD) API. However, it is a powerful resource to load 'modules' defining dependencies and events that need to be loaded|triggered before loading a specific module. 

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

Browser support
===========

* IE 6+
* Firefox 11+
* Safari 5+
* Chrome 3+
* Opera 10+