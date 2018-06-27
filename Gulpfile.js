const gulp = require('gulp');
const lambda = require('gulp-aws-lambda');
const zip = require('gulp-zip');

if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) {
  throw new Error(
    'AWS_ACCESS_KEY and AWS_SECRET_KEY must be set as environment variables!',
  );
}

const {
  functionName, role, runtime, region,
} = require('./config');

// For testing that the archive is created correctly
gulp.task('archive', () =>
  gulp.src('function/**/*').pipe(zip('archive.zip')).pipe(gulp.dest('build')));

const params = {
  FunctionName: functionName,
  Role: role,
  Runtime: runtime,
};

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region,
};

gulp.task('deploy', () => {
  gulp
    .src('function/**/*')
    .pipe(zip('archive.zip'))
    .pipe(lambda(credentials, params));
});
