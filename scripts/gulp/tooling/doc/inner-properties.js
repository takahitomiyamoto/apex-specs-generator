/**
 * @name doc/inner-properties.js
 */
import { TABLE_HEADER_PROPERTIES, TITLE_PROPERTIES } from './config';
import { getAnnotations, getModifiers } from './common';

/**
 * @description _createTableRowsInnerProperties
 * @param {*} params
 */
const _createTableRowsInnerProperties = (params) => {
  return params.map((inne) => {
    const annotations = getAnnotations(inne.annotations);
    const modifiers = getModifiers(inne.modifiers);
    return [`${annotations}`, `${modifiers}`, `${inne.type}`, `${inne.name}`];
  });
};

/**
 * @description _createTableInnerProperties
 * @param {*} params
 * @param {*} funcs
 */
const _createTableInnerProperties = (params, funcs) => {
  return {
    table: {
      headers: TABLE_HEADER_PROPERTIES,
      rows: funcs.createTableRows(params)
    }
  };
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
    _createTableInnerProperties(params, {
      createTableRows: _createTableRowsInnerProperties
    })
  );

  return result;
};
