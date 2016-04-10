var gulp = require('gulp'),
    browserify = require('browserify'),  
    babelify = require('babelify'),  
    source = require('vinyl-source-stream');
    
gulp.task('build', function(){
    browserify({
        entries: './source/index.jsx',
        extensions: ['jsx'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js')
    .pipe(gulp.dest('./build'))
});