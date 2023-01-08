const css = () => {
    return $.gulp.src($.path.css.src, {
            sourcemaps: $.app.isDev
        })
        .pipe($.gp.plumber({ //Отправляет уведомления через windows с ошибками
            errorHandler: $.gp.notify.onError()
        }))
        .pipe($.gp.concat("main.css")) // Итоговый файл, куда мы будем сохранять
        .pipe($.gp.cssimport()) // Чтобы css поддерживал import
        .pipe($.gp.webpCss()) //также как и в файле html для webp
        .pipe($.gp.autoprefixer()) // Чтобы старые браузеры поддержали код
        .pipe($.gp.shorthand()) // группирует свойство, которых можно объединить
        .pipe($.gp.groupCssMediaQueries()) // Объединяет все media вырожений
        .pipe($.gulp.dest($.path.css.dest, { // сохроняем все в файле main.css
            sourcemaps: $.app.isDev
        }))
        .pipe($.gp.rename({ // создаем еще один файл main.min.css
            suffix: '.min'
        }))
        .pipe($.gp.csso()) //минимизируем код
        .pipe($.gulp.dest($.path.css.dest, { // теперь все сохраняем в main.min.css в минимизированным виде
            sourcemaps: $.app.isDev
        }))
        .pipe($.browserSync.stream())

}

module.exports = css