const img = () => {
  return $.gulp.src($.path.img.src)
    .pipe($.gp.plumber({ //Отправляет уведомления через windows с ошибками
      errorHandler: $.gp.notify.onError()
    }))
    .pipe($.gp.newer($.path.img.dest))
    /*
      Пропускает те файлы, которые были изменены или, те которые были недавно добавлены.
      Нужен, чтобы сборка не отрабатывала одни и те же фотографии
    */
    .pipe($.gp.webp())
    .pipe($.gulp.dest($.path.img.dest))
    .pipe($.gulp.src($.path.img.src))
    .pipe($.gp.newer($.path.img.dest))
    .pipe($.gp.if($.app.isProd, $.gp.imagemin($.path.img))) // сжимает фотографии
    .pipe($.gulp.dest($.path.img.dest))
}

module.exports = img