'use strict';

// -------------------------------------
// Task: Compile: Inline Index Source
// -------------------------------------
const inlinesource = require('gulp-inline-source');
const rename = require('gulp-rename');

var newrelic = process.argv.indexOf('--nr') !== -1;
module.exports = function(gulp) {
return function() {
return gulp.src((newrelic) ? './public/_index-nr.html' : './public/_index.html')
.pipe(inlinesource())
.pipe(rename('index.html'))
.pipe(gulp.dest('./public'));
};
};
