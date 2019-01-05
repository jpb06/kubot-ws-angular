/// <binding />
const gulp = require('gulp');
const rimraf = require('rimraf');

const deployCommands = require('./build-logic/deploy.commands.js');

gulp.task('clean', () => {
  rimraf('./dist', (err) => {
    console.log('Error during clean:', err);
  });
});

gulp.task('deploy', async () => {

  await deployCommands.buildForProd();

  await deployCommands.zipDist();

  await deployCommands.sendFileToDeployServer();

  return deployCommands.deploy();

});
