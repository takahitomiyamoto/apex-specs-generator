/**
 * @name utils.js
 * @description utilities
 */
import { path } from './lib';

const ENVIRONMENT = '.secrets/environment.json';
const URL_SERVICE_SOAP_METADATA = 'my.salesforce.com/services/Soap/m';

/**
 * @description get environment file
 */
export const getEnvironment = () => {
  const environment = require(path.join(
    __dirname,
    path.relative(__dirname, ENVIRONMENT)
  ));

  return environment;
};

/**
 * @description sleep
 * @param {*} sec
 */
export const sleep = (sec) => {
  console.log(`[INFO] just give me ${sec} more seconds...`);
  // eslint-disable-next-line @lwc/lwc/no-async-operation
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};

export { URL_SERVICE_SOAP_METADATA };
