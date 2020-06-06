// 'use strict';

const project_folder = "dist";
const source_folder = "src";

const path = {
  build: {
    html: project_folder+"/",
    css: project_folder+"/css/",
    js: project_folder+"/js/",
    img: project_folder+"/img/",
    fonts: project_folder+"/fonts/",
  },

  src: {
    html: [source_folder+"/*.html", "!"+source_folder+"/_*.html"],
    pug: source_folder+"/index.pug",
    css: source_folder+"/scss/style.scss",
    js: source_folder+"/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg, png, svg, webp}",
    fonts: source_folder+"fonts/",
  },

  watch: {
    html: source_folder + "/**/*.html",
    pug: source_folder+"/index.pug",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder+"/img",
  },

  clean: "./" + project_folder + "/"
}

const {src, dest} = require('gulp'),
      gulp = require('gulp'),
      fileinclude = require('gulp-file-include'),
      scss = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      imgmin = require('gulp-imagemin'),
      webp = require('gulp-webp'),
      lazyScr = require('gulp-lazysizes-srcset');
      webphtml = require('gulp-webp-html'),
      browsersync = require("browser-sync").create();

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },

    port: 3000,
    browser: 'chrome',
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    // .pipe(webphtml())
    // .pipe(
    //   lazyScr({
    //     decodeEntities: false,
    //     data_src: 'data-src',
    //     data_srcset: 'data-srcset',
    //     suffix: {'320w': '@320w', '640w': '@640w', '960w': '@960w'}
    //   })
    // )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    // .pipe(
    //   webp({
    //       quality: 70
    //   })
    // )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imgmin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )

    .pipe(dest(path.build.css))
    
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.js], js);
}

const build = gulp.series(gulp.parallel(js, css, html, images));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;