const font = () => {
    return $.gulp.src($.path.font.src)
        .pipe($.gp.plumber({ //Отправляет уведомления через windows с ошибками
            errorHandler: $.gp.notify.onError()
        }))
        .pipe($.gp.newer($.path.img.dest))
        .pipe($.gp.fonter($.app.fonter)) // чтобы переформатировать  их в указанный формат
        .pipe($.gulp.dest($.path.font.dest)) // сохранить
        .pipe($.gp.ttf2woff2()) // и отдельно для форматов ttf2, woff2 нужен отделный плагин. переформатируем в  ttf2, woff2
        .pipe($.gulp.dest($.path.font.dest)) // Еще раз создать переформатированный файлы
}

module.exports = font