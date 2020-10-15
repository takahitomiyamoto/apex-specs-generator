/**
 * @name doc/external-references.js
 */
import {
  NOT_APPLICABLE,
  TABLE_HEADER_EXTERNAL_REFERENCES,
  TITLE_EXTERNAL_REFERENCES
} from './config';
import { getMethods, getVariables } from './common';
import { createTable } from './table';

/**
 * @description _createTableRow
 * @param {*} exte
 */
const _createTableRow = (exte) => {
  const variables = getVariables(exte.variables);
  const methods = getMethods(exte.methods);

  const row = [];
  row.push(`${exte.namespace}`);
  row.push(`${exte.name}`);
  row.push(`${variables}`);
  row.push(`${methods}`);
  return row;
};

/**
 * @description _createTableRows
 * @param {*} params
 * @param {*} funcs
 */
const _createTableRows = (params, funcs) => {
  return params.map((exte) => {
    return funcs.createTableRow(exte);
  });
};

/**
 * @description createTableExternalReferences
 * @param {*} params
 */
export const createTableExternalReferences = (params) => {
  return createTable(params, TABLE_HEADER_EXTERNAL_REFERENCES, {
    createTableRow: _createTableRow,
    createTableRows: _createTableRows
  });
};

/**
 * @description _createExternalReferences
 * @param {*} params
 */
const _createExternalReferences = (params) => {
  return createTableExternalReferences(params.externalReferences);
};

/**
 * @description createExternalReferencesArea
 * @param {*} params
 */
export const createExternalReferencesArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_EXTERNAL_REFERENCES });

  if (!params.externalReferences.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(_createExternalReferences(params));
  }

  return result;
};
