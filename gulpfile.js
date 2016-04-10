var gulp       = require('gulp')  ,
    webserver  = require('gulp-webserver'),
    stylus     = require('gulp-stylus'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    source     = require('vinyl-source-stream'),
    nib        = require('nib'),
    minify     = require('gulp-minify-css');

gulp.task('server', function() {  
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 3001,
      fallback: 'index.html',
      livereload: true
    }))
})

gulp.task('stylus', function() {  
  gulp.src('./source/styles/style.styl')
    .pipe(stylus({
      use: nib(),
      'include css': true,
    }))
    .pipe(minify())
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('build', function() {  
  browserify({
    entries: './source/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/js'))
})

gulp.task('watch', function() {  
  gulp.watch('./source/**/*.jsx', ['build'])
  gulp.watch(['./source/styles/**/*.styl', './source/components/**/*.styl'], ['stylus'])
})

gulp.task('default', ['server', 'watch'])  