import config from '../config/index';
import {connectToMongo} from '../database';
import Command from './command';
import container from '../ioc';

async function createCliApp() {
  const isConnected = await connectToMongo(config.database.url);
  if (!isConnected) return;

  return {ioc: container}
}

/**
 *
 * @param options
 * @returns {string}
 */
function composeOptions(options) {
  let composedOptions = '';
  for (let prop in options) {
    if (options.hasOwnProperty(prop)) {
      composedOptions += ` --${prop}=${options[prop]}`;
    }
  }

  return composedOptions;
}

/**
 *
 * @param command
 * @param options
 */
function run(command, options = {}) {
  Command.factory(`--command=${command} ${composeOptions(options)}`).run();
}

/**
 *
 * @param command
 * @param options
 */
function runInBackground(command, options = {}) {
  Command.factory(`--command=${command} ${composeOptions(options)}`).runInBackground();
}

export {
  createCliApp,
  run,
  runInBackground
};
