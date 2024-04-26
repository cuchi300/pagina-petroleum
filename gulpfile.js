const {src, dest, watch, series} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); // minifica el codigo css
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps'); // crea un mapa para encontrar la linea donde se encunetra el codigo css
const plumber = require('gulp-plumber'); // evita que gulp se detenga y muestra error


const imagemin = require('gulp-imagemin'); // minifica las imagenes reduciendo su tamaño
const webp = require('gulp-webp'); // convierte imagenes en webp
const avif = require('gulp-avif'); // convierte imagenes en avif

// javascript

const terser = require('gulp-terser-js'); // minifica el codigo javascript

function css() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) // guarda el codigo en destino creando carpeta
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3})) // optimiza la imagen para mejor calidad
        .pipe(dest('build/img'))
}

function imagenWebp() {
    const opciones = {
        quality: 50 // mejora caldiad imagen webp
    } 
    return src('src/img/**/*.{jpg,png}') 
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}
function imagenAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function javascript() {
    return src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
}
function dev() {
    watch('src/scss/**/*.scss', css) // observa los cambios en el codigo para guardar
    watch('src/img/**/*', imagenes) // obserba cuando se agregan nuevas imagenes
    watch('src/js/**/*', javascript)
}

exports.css = css;
exports.imagenes = imagenes;
exports.imagenWebp = imagenWebp;
exports.imagenAvif = imagenAvif;
exports.javascript = javascript;
exports.default = series(javascript, css, dev);