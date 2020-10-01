/**
 * @name doc/parameters.js
 */
import {
  HEADERS_PARAMETERS_TABLE,
  NOT_APPLICABLE,
  TITLE_PARAMETERS
} from './config';

/**
 * @description createParameters
 * @param {*} parameters
 */
export const createParameters = (parameters) => {
  return parameters.map((para) => {
    return `${para.type} ${para.name}`;
  });
};

const createParametersTableRows = (params) => {
  return params.map((para) => {
    return [`${para.type}`, `${para.name}`];
  });
};

/**
 * @description createParametersTable
 * @param {*} params
 */
const createParametersTable = (params) => {
  return {
    headers: HEADERS_PARAMETERS_TABLE,
    rows: createParametersTableRows(params)
  };
};

/**
 * @description createParametersArea
 * @param {*} params
 */
export const createParametersArea = (params) => {
  const result = [];
  result.push({ h4: TITLE_PARAMETERS });

  if (!params.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push({
      table: createParametersTable(params)
    });
  }

  return result;
};
