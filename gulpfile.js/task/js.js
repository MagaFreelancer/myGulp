

const webpack = require('webpack-stream');


const js = () => {
    return $.gulp.src($.path.js.src, {
            sourcemaps: $.app.isDev
        })
        .pipe($.gp.plumber({ //Отправляет уведомления через windows с ошибками
            errorHandler: $.gp.notify.onError()
        }))
        .pipe($.gp.babel()) //для поддержки кода на всех браузерах
        .pipe(webpack($.app.webpack))
        // .pipe(uglify()) //минимизируем код
        .pipe($.gulp.dest($.path.js.dest, { // сохроняем все в файле main.css
            sourcemaps: $.app.isDev
        }))
        .pipe($.browserSync.stream())

}

module.exports = js