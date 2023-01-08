const html = () => {
    return $.gulp.src($.path.html.src)
        .pipe($.gp.plumber({
            errorHandler: $.gp.notify.onError()
        }))
        .pipe($.gp.fileInclude()) //чтобы поддерживал шаблоны
        .pipe($.gp.webpHtml()) //чтобы не пришлось дополнительно писать код, чтобы поддерживал webp 
        .pipe($.gp.size())
        .pipe($.gp.htmlmin($.app.htmlmin)) // сжимает код
        .pipe($.gp.size())
        .pipe($.gulp.dest($.path.root))
        .pipe($.browserSync.stream())
}

module.exports = html;