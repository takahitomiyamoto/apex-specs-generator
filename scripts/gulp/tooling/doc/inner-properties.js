/**
 * @name doc/inner-properties.js
 */
import { TITLE_PROPERTIES } from './config';
import { createTableProperties } from './properties';

/**
 * @description createInnerPropertiesArea
 * @param {*} params
 */
export const createInnerPropertiesArea = (params) => {
  const result = [];
  result.push({ h4: TITLE_PROPERTIES });

  if (!params.length) {
    return [];
  }

  result.push(createTableProperties(params));

  return result;
};
