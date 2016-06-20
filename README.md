# [HUMANITY](https://www.humanity.com/) - Knowledge Lab

## Dependencies
* [git](https://git-scm.com/) - Distributed version control system 
* [node.js](http://nodejs.org) - JavaScript runtime 


##Clone repository

```sh
$ git clone git@github.com:knowledge-lab/lab.git
```

##Install tools

```sh
$ npm install -g bower
$ npm install -g grunt-cli
$ npm install -g lr-http-server
$ npm install -g json-server
$ npm install 
```

* [Bower](http://bower.io) - A package manager for the web
* [Grunt](http://gruntjs.com) - The JavaScript Task Runner
* [lr-http-server](https://www.npmjs.com/package/lr-http-server) - An HTTP server with livereload included
* [json-server](https://www.npmjs.com/package/json-server) - Serves JSON files through REST routes.


##Install libraries
```sh
$ bower install
```

* [Require JS](http://requirejs.org/docs/1.0/) JavaScript file and module loader
* [Skeleton](http://getskeleton.com/) A dead simple, responsive boilerplate.
* [FontAwesome](https://fortawesome.github.io/Font-Awesome/) The iconic font and CSS toolkit
* [Normalize CSS](http://necolas.github.io/normalize.css/) A modern, HTML5-ready alternative to CSS resets
* [jQuery](https://jquery.com/)  Fast, small, and feature-rich JavaScript library.
* [CanJS](https://canjs.com/) Library that makes developing complex applications simple and fast


##Compile LESS files to CSS
```sh
$ grunt less
```

##Start http server
```sh
$ lr-http-server
```

##Start json server
```sh
$ json-server db.json --delay 300
```

##Open application
[Lab](http://127.0.0.1:8080) Visit the link
