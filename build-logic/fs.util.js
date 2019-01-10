const fs = require('fs-extra');

const consoleUtil = require('./console.util.js');

var main = {};

main.copyFilesForDeploy = async function () {
  consoleUtil.printHeader('Copying files to deploy ...');

  await fs.copy('./src', './deploy/src');
  await fs.copy('./tsconfig.json', './deploy/tsconfig.json');
  await fs.copy('./angular.json', './deploy/angular.json');
  await fs.copy('./package.json', './deploy/package.json');
  await fs.copy('./README.md', './deploy/README.md');
  await fs.copy('./build-logic/private/start.sh', './deploy/start.sh');

  console.log('Done.');
};

main.cleanDeploy = async function () {
  consoleUtil.printHeader('Cleaning deploy folder ...');

  await fs.emptyDir('./deploy');

  console.log('Done.');
};

module.exports = main;
