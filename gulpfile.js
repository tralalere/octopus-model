var gulp = require('gulp');

gulp.task('test', function () {
	var mocha = require('gulp-mocha');
    return gulp.src('tests/**/*.js', { read: false }).pipe(mocha({reporter: 'list'}));
});