global.$ = {
    gulp: require("gulp"),
    gp: require("gulp-load-plugins")(),
    browserSync: require('browser-sync').create(),
    path: require('./config/path.js'),
    app: require('./config/app.js'),
}

const clear = require('./task/clear.js');
const server = require('./task/server.js')
const html = require('./task/html.js');
const css = require('./task/css.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const img = require('./task/img.js');
const font = require('./task/font.js');

const watcher = () => {
    $.gulp.watch($.path.html.watch, html)
    $.gulp.watch($.path.scss.watch, scss)
    $.gulp.watch($.path.js.watch, js)
    $.gulp.watch($.path.img.watch, img)
    $.gulp.watch($.path.font.watch, font)
}



const build = $.gulp.series(
    clear,
    $.gulp.parallel(html, scss, js, img, font),
    $.gulp.parallel(watcher, server)
)
const dev = $.gulp.series(
    build,
    $.gulp.parallel(watcher, server)
)

exports.html = html;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.img = img;
exports.font = font;

exports.default = $.app.isProd ? build : dev;