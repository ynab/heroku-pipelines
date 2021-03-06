'use strict';

let cli = require('heroku-cli-util');

module.exports = {
  topic: 'pipelines',
  command: 'remove',
  description: 'remove this app from its pipeline',
  help: 'Remove this app from its pipeline.\n\n  Example:\n  $ heroku pipelines:remove -a example-admin\n  Removing example-admin... done',
  needsApp: true,
  needsAuth: true,
  run: cli.command(function* (context, heroku) {
    let promise = heroku.request({
      method: 'DELETE',
      path: `/apps/${context.app}/pipeline-couplings`,
      headers: { 'Accept': 'application/vnd.heroku+json; version=3.pipelines' }
    }); // heroku.apps(app).pipeline-couplings().destroy();
    let pipeline = yield cli.action(`Removing ${context.app}`, promise);
    cli.hush(pipeline);
  })
};
