var bower = require('gulp-bower'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jshintReporter = require('jshint-stylish'),
	notify = require('gulp-notify'),
	sass = require('gulp-sass'),
	shell = require('gulp-shell'),
	watch = require('gulp-watch');

var paths = {
	'bower': './bower_components',
	'src': [
		'./models/**/*.js',
		'./routes/**/*.js',
		'keystone.js',
		'package.json'
	],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}

};

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest(paths.bower))
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
	'watch:sass',
	'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
