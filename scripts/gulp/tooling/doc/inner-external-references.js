/**
 * @name doc/inner-external-references.js
 */
import {
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
 * @description _createTableExternalReferences
 * @param {*} params
 * @param {*} funcs
 */
const _createTableExternalReferences = (params, funcs) => {
  return {
    table: {
      headers: TABLE_HEADER_EXTERNAL_REFERENCES,
      rows: funcs.createTableRows(params)
    }
  };
};

/**
 * @description createInnerExternalReferencesArea
 * @param {*} params
 */
export const createInnerExternalReferencesArea = (params) => {
  const result = [];
  result.push({ h4: TITLE_EXTERNAL_REFERENCES });

  if (!params.length) {
    return [];
  }

  result.push(
    _createTableExternalReferences(params, {
      createTableRows: _createTableRowsExternalReferences
    })
  );

  return result;
};
