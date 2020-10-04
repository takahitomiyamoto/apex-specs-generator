/**
 * @name doc/external-references.js
 */
import {
  NOT_APPLICABLE,
  TABLE_HEADER_EXTERNAL_REFERENCES,
  TITLE_EXTERNAL_REFERENCES
} from './config';
import { getMethods, getVariables } from './common';

/**
 * @description createTableRowsExternalReferences
 * @param {*} params
 */
const createTableRowsExternalReferences = (params) => {
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
 * @description createTableExternalReferences
 * @param {*} params
 */
const createTableExternalReferences = (params) => {
  return {
    headers: TABLE_HEADER_EXTERNAL_REFERENCES,
    rows: createTableRowsExternalReferences(params)
  };
};

/**
 * @description createExternalReferencesArea
 * @param {*} params
 */
export const createExternalReferencesArea = (params) => {
  const externalReferences = params.externalReferences;
  const result = [];
  result.push({ h2: TITLE_EXTERNAL_REFERENCES });

  if (!externalReferences.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push({
      table: createTableExternalReferences(externalReferences)
    });
  }

  return result;
};
