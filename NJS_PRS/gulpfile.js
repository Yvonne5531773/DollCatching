(function(){
	const source    = require('vinyl-source-stream');
	const buffer    = require('vinyl-buffer');
	const sourcemaps= require('gulp-sourcemaps');
	const uglify    = require('gulp-uglify');
	const es        = require('event-stream');
	const browserify= require('browserify');
	const gulp      = require('gulp');
	const through2  = require('through2');
	const debug     = require('gulp-debug');
	const path      = require('path');
	const concat    = require('gulp-concat');
	const insert    = require('gulp-insert');
	const co        = require('co');
	const fs        = require('fs');
	const queue     = require('streamqueue');
	const rename    = require('gulp-rename');
	const htmlmin   = require('gulp-htmlmin');

	const src = 'src';

	gulp.task('js', ()=>
		es.merge(
			[
				src,
			].map(dir=>{
				return queue({ objectMode: true },
					gulp.src([
						path.join(__dirname, `${dir}/js/*.js`),
					])
				)
					.pipe(uglify())
					.pipe(gulp.dest(path.join(__dirname, `output/js`)));
			})
		)
	);

	gulp.task('css', (cb)=>
		gulp.src(path.join(__dirname, src + '/**/css/*'))
			.pipe(
				gulp.dest(path.join(__dirname, 'output/'))
			)
	);

	gulp.task('images', ()=>
		gulp.src(path.join(__dirname, src + '/**/img/*'))
			.pipe(
				gulp.dest(path.join(__dirname, 'output'))
			)
	);


	gulp.task('default', [
		'js',
		'css',
		'images',
	]);
})();