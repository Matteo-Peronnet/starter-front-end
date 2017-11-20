var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReaplce = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var fontAwesome = require('node-font-awesome');
var cssUrl = require('gulp-css-url-adjuster');
var twig = require('gulp-twig');

var config = {
  dist: 'dist/',
  src: 'src/',
  build: 'src/build/',
  cssin: 'src/css/**/*.css',
  jsin:
    [
    'src/js/jquery.min.js',
    'src/js/jquery.fullpage.min.js',
    'src/js/parallax.js'
    ],
  imgin: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
  twigin: 'src/twig/**/*.twig',
  scssin: 'src/scss/**/*.scss',
  icoin: 'src/favicon.ico',
  cssout: 'dist/css/',
  jsout: 'dist/js/',
  imgout: 'dist/img/',
  fontout: 'dist/fonts/',
  htmlout: 'dist/',
  scssout: 'src/css/',
  cssoutname: 'style.css',
  jsoutname: 'script.js',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/script.js'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['sass', 'twig'], function() {
  browserSync({
    server: {
      baseDir: [config.src, config.build]
    }
  });
  gulp.watch(config.twigin, function(){sequence('twig','reload')});
  gulp.watch(config.jsin, ['reload']);
  gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', function() {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass({
      loadPath: [fontAwesome.scssPath]
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream());
});

gulp.task('font', function() {
  return gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest(config.fontout));
});

gulp.task('css', function() {
  return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cssUrl({
      replace: ['../../img/','../img/']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout));
});

gulp.task('js', function() {
  return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout));
});

gulp.task('ico', function() {
  return gulp.src(config.icoin)
    .pipe(gulp.dest(config.dist));
});


gulp.task('img', function() {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

gulp.task('twig', function(){
  return gulp.src(config.twigin)
    .pipe(twig({
              data: {
                  title: 'Gulp and Twig',
                  benefits: [
                      'Fast',
                      'Flexible',
                      'Secure'
                  ]
              },
              errorLogToConsole: true
      }))
      .pipe(gulp.dest(config.build));
})

gulp.task('twig-build', function(){
  return gulp.src(config.twigin)
    .pipe(twig({
              data: {
                  title: 'Gulp and Twig',
                  benefits: [
                      'Fast',
                      'Flexible',
                      'Secure'
                  ]
              },
      }))
      .pipe(gulp.dest(config.dist));
})

gulp.task('html', function() {
  console.log('hi')
  return gulp.src(config.twigin)
    .pipe(htmlReaplce({
      'css': config.cssreplaceout,
      'js': config.jsreplaceout
    }))

    /*.pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))*/
    .pipe(gulp.dest(config.dist))
});

gulp.task('clean', function() {
  return del([config.dist]);
});

gulp.task('build', function() {
  sequence('clean', ['html', 'twig-build', 'js', 'css', 'img','font','ico']);
});

gulp.task('default', ['serve']);
