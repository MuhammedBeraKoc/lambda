const { src, dest, series } = require('gulp')
const del = require('del')
const run = command => require('gulp-run')(command, {})
const uglify = require('gulp-uglify')
const tsProject = require('gulp-typescript').createProject('tsconfig.json')

function format() {
    return Promise.resolve(run('prettier --check --write "{src,__tests__}/**/*.ts"').exec())
}

function clearDist() {
    return del('dist')
}

function compileTypeScript() {
    return src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('dist'))
}

function minify() {
    return src('dist/**/*.js')
        .pipe(uglify())
        .pipe(dest('dist'))
}

exports.clearDist = clearDist
exports.format = format
exports.minify = minify
exports.compileTypeScript = compileTypeScript
exports.default = series(format, clearDist, compileTypeScript, minify)