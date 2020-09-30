/**
 * @name apex-specs-generator.js
 */
import { getEnvironment } from '../common/utils';
import { generateApexSpecs } from './apex/index';

/**
 * @description generate Apex Specifications
 */
export default async function _generateApexSpecs() {
  // .env
  const environment = getEnvironment();

  // Apex Class
  await generateApexSpecs(environment, 'ApexClass');
  // Apex Trigger
  await generateApexSpecs(environment, 'ApexTrigger');
}
