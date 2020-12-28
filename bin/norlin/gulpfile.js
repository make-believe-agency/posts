var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  cleancss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  zip = require('gulp-zip'),
  del = require('del');

// Local Server
gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://localhost:2368',
    // server: {
    //   baseDir: ''
    // },
    notify: false
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});


// HBS Live Reload
gulp.task('code', function () {
  return gulp.src(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs'])
    .pipe(browserSync.reload({ stream: true }));
});


// Custom Styles
gulp.task('sass', function () {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
    .pipe(concat('main.min.css'))
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 10 versions']
      })
    )
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});


// Scripts & JS Libraries
gulp.task('js', function () {
  return gulp
    .src([
      './assets/js/vendors/jquery-3.5.1.min.js',
      './assets/js/vendors/zoom.min.js',
      './assets/js/vendors/transition.js',
      './assets/js/vendors/jquery.fitvids.js',
      './assets/js/vendors/jquery.ghosthunter.js',
      './assets/js/vendors/lazyload.min.js',
      './assets/js/vendors/prism.js',
      './assets/js/common.js'
    ])
    .pipe(concat('common.min.js'))
    .pipe(uglify()) // Minify js (opt.)
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.reload({ stream: true }))
});


// Production - Compress Theme
gulp.task('zip', function () {
  var targetDir = 'dist/';
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return gulp
    .src([
      './**',
      '!node_modules',
      '!node_modules/**',
      '!package-lock.json',
      '!dist',
      '!dist/**',
      '!.gitignore',
      '!**/Thumbs.db',
      '!**/*.DS_Store'
    ])
    .pipe(zip(filename))
    .pipe(gulp.dest(targetDir));
});


// Remove Dist Folder
gulp.task('clean', function () {
  return del(['dist'], { force: true })
});


gulp.task('watch', function () {
  gulp.watch('./assets/sass/**/*.scss', gulp.parallel('sass'));
  gulp.watch(['./assets/js/common.js', './assets/js/vendors/*.js'], gulp.parallel('js'));
  gulp.watch(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs'], gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));

gulp.task('production', gulp.parallel('sass', 'js', 'zip'));