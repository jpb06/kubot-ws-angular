const gulp = require('gulp');
const fs = require('fs');
const GulpSSH = require('gulp-ssh');
const util = require('util');
var log = require('fancy-log');

const zipUtil = require('./zip.util.js');

const settings = require('./private/private.config.js');
const exec = util.promisify(require('child_process').exec);
const spawn = require('cross-spawn');

let pckg = require('./../package.json');

var main = {};

function header(message) {
  let line = '--------------------------------------------------------------------------------';
  console.log(line + '\n' + message + '\n' + line);
}

main.buildForProd = async function () {

  header('Building solution (prod optimizations on) ...');

  spawn.sync('ng build', ['--prod', '--common-chunk', '--vendor-chunk'], { stdio: 'inherit' });

};

main.zipDist = async function () {

  header('Zipping dist ...');

  await zipUtil.zipDirectory('./dist/kubot-ws-angular', `./release/kubotwsangular_${pckg.version}.zip`);

  console.log(`Archive kubotwsangular_${pckg.version}.zip created in release folder`);

};

main.sendFileToDeployServer = async function () {

  header('Sending file to deploy server ...');

  const { stdout, stderr } = await exec(`.\\pscp.exe -P ${settings.port} -l ${settings.user} -i ${settings.priPath} ./release/kubotwsangular_${pckg.version}.zip ${settings.user}@${settings.srvAddress}:${settings.destPath}`);

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

};

main.deploy = function () {

  header('Deploying ...');

  let gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: settings.srvAddress,
      port: settings.port,
      username: settings.user,
      privateKey: fs.readFileSync(settings.priPath)
    }
  });

  return gulpSSH
    .shell([`sudo ${settings.deployScriptPath}`], { filePath: `${pckg.version}_deploy.log` })
    .on('ssh2Data', function (data) {
      process.stdout.write(data.toString());
    });
};

module.exports = main;
