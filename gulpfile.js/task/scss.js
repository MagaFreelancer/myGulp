//плагины
const sass = require('gulp-sass')(require("sass"));
// const sassGlob = require('gulp-sass-glob') можем всё сразу импортировать через @import "block/*.scss". Но мы не можем контролировать последовательность их подключелния

const scss = () => {
    return $.gulp.src($.path.scss.src, {
            sourcemaps: $.app.isDev
        })
        .pipe($.gp.plumber({ //Отправляет уведомления через windows с ошибками
            errorHandler: $.gp.notify.onError()
        }))
        // .pipe(sassGlob()) // можем всё сразу импортировать через @import "block/*.scss". Но мы не можем контролировать последовательность их подключелния
        .pipe(sass()) // чтобы sass/scss компилировать в css
        .pipe($.gp.webpCss())
        .pipe($.gp.autoprefixer()) // Чтобы старые браузеры поддержали код
        .pipe($.gp.shorthand()) // группирует свойство, которых можно объединить
        .pipe($.gp.groupCssMediaQueries()) // Объединяет все media вырожений
        .pipe($.gulp.dest($.path.scss.dest, { // сохроняем все в файле main.css
            sourcemaps: $.app.isDev
        }))
        .pipe($.gp.rename({ // создаем еще один файл main.min.css
            suffix: '.min'
        }))
        .pipe($.gp.csso()) //минимизируем код
        .pipe($.gulp.dest($.path.scss.dest, { // теперь все сохраняем в main.min.css в минимизированным виде
            sourcemaps: $.app.isDev
        }))
        .pipe($.browserSync.stream())

}

module.exports = scss