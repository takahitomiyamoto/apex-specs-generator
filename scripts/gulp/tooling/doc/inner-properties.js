/**
 * @name doc/inner-properties.js
 */
import { TITLE_PROPERTIES } from './config';
import { createTableProperties, createTableRowsProperty } from './properties';

/**
 * @description _createTableRowsInnerProperties
 * @param {*} params
 */
const _createTableRowsInnerProperties = (params) => {
  return params.map((inne) => {
    return createTableRowsProperty(inne)[0];
  });
};

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

  result.push(
    createTableProperties(params, {
      createTableRows: _createTableRowsInnerProperties
    })
  );

  return result;
};
