const { src, dest, watch, series, parallel } = require("gulp");
const $ = require("gulp-load-plugins")();
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const fs = require("fs");
const browserSync = require("browser-sync").create();
const del = require("del");

function localServer() {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
}

function templates() {
  return src("src/pug/pages/*.pug")
    .pipe(
      $.pug({
        locals: {
          content: JSON.parse(fs.readFileSync("src/data/content.json", "utf8"))
        }
      })
    )
    .pipe(dest("dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function styles() {
  const plugins = [autoprefixer(), cssnano()];

  return src("src/scss/styles.scss")
    .pipe($.sourcemaps.init())
    .pipe($.sass().on("error", $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.rename("styles.min.css"))
    .pipe($.sourcemaps.write())
    .pipe(dest("dist/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function scripts() {
  return src("src/js/scripts.js")
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.concat("scripts.min.js"))
    .pipe($.sourcemaps.write())
    .pipe(dest("dist/js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function images() {
  return src("src/img/**/*").pipe(dest("dist/img"));
}

function icons() {
  return src("src/icons/**/*").pipe(dest("dist/icons"));
}

function fonts() {
  return src("src/fonts/**/*").pipe(dest("dist/fonts"));
}

async function clean() {
  await del("dist/");
  console.log('"dist" folder deleted');
}

function watching() {
  watch("src/pug/pages/*.pug", templates);
  watch("src/scss/**/*.scss", styles);
  watch("src/js/*.js", scripts);
  watch("src/img/**/*", images);
  watch("src/fonts/**/*", fonts);
}

async function build() {
  series(
    await clean,
    await parallel(templates, styles, scripts, images, icons, fonts)
  );
}

exports.default = series(build, parallel(watching, localServer));
