/**
 * @name doc/inner-properties.js
 */
import {
  NOT_APPLICABLE,
  HEADERS_PROPERTIES_TABLE,
  TITLE_PROPERTIES
} from './config';
import { getAnnotations, getModifiers } from './common';

/**
 * @description getInnerPropertiesTableRows
 * @param {*} params
 */
const getInnerPropertiesTableRows = (params) => {
  return params.map((inne) => {
    return [
      `${getAnnotations(inne.annotations)}`,
      `${getModifiers(inne.modifiers)}`,
      `${inne.type}`,
      `${inne.name}`
    ];
  });
};

/**
 * @description createInnerPropertiesTable
 * @param {*} params
 */
const createInnerPropertiesTable = (params) => {
  return {
    headers: HEADERS_PROPERTIES_TABLE,
    rows: getInnerPropertiesTableRows(params)
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
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push({
      table: createInnerPropertiesTable(params)
    });
  }

  return result;
};
