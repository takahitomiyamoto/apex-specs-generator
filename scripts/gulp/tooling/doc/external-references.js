/**
 * @name doc/external-references.js
 */
import {
  NOT_APPLICABLE,
  HEADERS_EXTERNAL_REFERENCES_TABLE,
  TITLE_EXTERNAL_REFERENCES
} from './config';
import { getMethods, getVariables } from './common';

/**
 * @description createExternalReferencesTableRows
 * @param {*} params
 */
const createExternalReferencesTableRows = (params) => {
  return params.map((exte) => {
    return [
      `${exte.namespace}`,
      `${exte.name}`,
      `${getVariables(exte.variables)}`,
      `${getMethods(exte.methods)}`
    ];
  });
};

/**
 * @description createExternalReferencesTable
 * @param {*} params
 */
const createExternalReferencesTable = (params) => {
  return {
    headers: HEADERS_EXTERNAL_REFERENCES_TABLE,
    rows: createExternalReferencesTableRows(params)
  };
};

/**
 * @description createExternalReferencesArea
 * @param {*} params
 */
export const createExternalReferencesArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_EXTERNAL_REFERENCES });

  if (!params.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push({
      table: createExternalReferencesTable(params)
    });
  }

  return result;
};
