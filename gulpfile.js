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
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var fontAwesome = require('node-font-awesome');
var cssUrl = require('gulp-css-url-adjuster');
var twig = require('gulp-twig');

/* Browserify */
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')
var gutil = require('gulp-util')
var chalk = require('chalk')


var config = {
  dist: 'dist/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/app.js',
  imgin: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
  twigin: 'src/twig/**/*.twig',
  htmlin: 'dist/**/*.html',
  scssin: 'src/scss/**/*.scss',
  icoin: 'src/favicon.ico',
  cssout: 'dist/css/',
  jsout: 'dist/js/',
  imgout: 'dist/img/',
  fontout: 'dist/fonts/',
  htmlout: 'dist/',
  scssout: 'dist/css/',
  cssoutname: 'style.css',
  jsoutname: 'script.js',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/app.min.js'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['sass', 'twig', 'img','font','ico'], function() {
  browserSync({
    server: {
      baseDir: [config.dist]
    }
  });
  gulp.watch(config.twigin, function(){sequence('twig','reload')});
  gulp.watch(config.scssin, ['sass']);

  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify(config.jsin, args)).transform(babelify, { /* options */ })
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler);
    browserSync.reload();
  })
});


function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(config.jsout))
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.jsout))
}

function map_error(err) {
  if (err.fileName) {
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.end()
}


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
      .pipe(gulp.dest(config.htmlout));
})

gulp.task('js', function () {
  var bundler = browserify(config.jsin).transform(babelify, {/* options */ })

  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout))
})

gulp.task('twig-build', function(){
  return gulp.src(config.twigin)
    .pipe(twig({
              data: {
                  
              },
      }))
      .pipe(gulp.dest(config.dist));
})

gulp.task('html', function() {
  return gulp.src(config.htmlin)
    .pipe(htmlReplace({
      'css': config.cssreplaceout,
      'js': config.jsreplaceout
    }))
    /*
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    */
    .pipe(gulp.dest(config.dist))
});

gulp.task('clean', function() {
  return del([config.dist]);
});

gulp.task('build', function() {
  sequence(['clean'],'twig',['html', 'js', 'css', 'img','font','ico']);
});

gulp.task('default', ['serve']);
