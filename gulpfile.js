const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const fileInclude = require("gulp-file-include");

const src = {
  html: "src/**/*.html",
  css: "src/styles/**/*.scss",
  js: "src/js/*.js",
  images: "src/assets/images/**/*",
};

const dist = {
  root: "build/",
  html: "build/*.html",
  css: "build/styles",
  js: "build/js",
  images: "build/assets/images",
  pages: "src/pages/*.html",
};

function html() {
  return gulp
    .src([src.html, dist.pages])
    .pipe(browserSync.stream())
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(dist.root));
}

function css() {
  return gulp
    .src("src/styles/main.scss")
    .pipe(concat("styles.css"))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src(src.js).pipe(concat("index.js")).pipe(gulp.dest(dist.js));
}

function images() {
  return gulp
    .src(src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(dist.images))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: dist.root,
      middleware: [
        function (req, res, next) {
          var url = req.url;
          if (!url.endsWith(".html") && url.indexOf(".") === -1) {
            url += ".html";
            req.url = url;
          }
          next();
        },
      ],
      rewrites: [
        {
          from: /^(?!\/(styles|js|assets)\/).*$/,
          to: function (context) {
            return context.parsedUrl.pathname + ".html";
          },
        },
      ],
    },
  });

  gulp.watch(src.html, html);
  gulp.watch(dist.pages, html);
  gulp.watch(src.css, css);
  gulp.watch(src.js, js);
  gulp.watch(src.images, images);
}

exports.default = gulp.series(gulp.parallel(html, css, js, images), serve);
