//Definição dos Modulos a serem utilizados no projeto
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


//Função para complilar o SASS e adicionar os prefixos
function compilaSass(){
    return gulp.src('css/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
}


//Tarefa de Gulp para a função de SASS
gulp.task('sass', compilaSass);

//Função para Juntar os arquivos JavaScript
function gulpJS(){
    return gulp.src('js/main/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets:['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
}

//Tarefa de Gulp para função de Concat
gulp.task('mainjs', gulpJS);

//Plugins JS

function pluginsJS(){
    return gulp
    .src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/moment/min/moment.min.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream()); 
}

gulp.task('pluginsjs', pluginsJS);

//Função para iniciar o Browser
function browser(){
    browserSync.init({
        server:{
            baseDir: './dist'
        }
    })
}


//Tarefa de Gulp para o Browser-sync
gulp.task('browser-sync', browser);


//Função de Watch do Gulp
function watch(){
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('js/main/*.js', gulpJS);
    gulp.watch('js/plugins/*.js', pluginsJS);
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}


//Inicia a tarefa de Watch
gulp.task('watch', watch);


//Tarefa padrão do Gulp que inicia o Watch e browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync','sass', 'mainjs', 'pluginsjs'));