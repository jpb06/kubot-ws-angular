/// <binding />
const gulp = require('gulp');
const rimraf = require('rimraf');

const deployCommands = require('./build-logic/deploy.commands.js');
const fsUtil = require('./build-logic/fs.util.js');

gulp.task('clean', () => {
  rimraf('./dist', (err) => {
    console.log('Error during clean:', err);
  });
});

gulp.task('deploy', async () => {

  //await deployCommands.buildForProd();

  await fsUtil.cleanDeploy();

  await fsUtil.copyFilesForDeploy();

  await deployCommands.zipDeploy();

  await deployCommands.sendFileToDeployServer();

  return deployCommands.deploy();

});
