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
 * @description _createTableRowsExternalReferences
 * @param {*} params
 */
const _createTableRowsExternalReferences = (params) => {
  return params.map((exte) => {
    const variables = getVariables(exte.variables);
    const methods = getMethods(exte.methods);
    return [`${exte.namespace}`, `${exte.name}`, `${variables}`, `${methods}`];
  });
};

/**
 * @description createTableExternalReferences
 * @param {*} params
 */
export const createTableExternalReferences = (params) => {
  return {
    table: {
      headers: TABLE_HEADER_EXTERNAL_REFERENCES,
      rows: _createTableRowsExternalReferences(params)
    }
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
    result.push(createTableExternalReferences(externalReferences));
  }

  return result;
};
