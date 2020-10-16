/**
 * @name doc/external-references.js
 */
import { TABLE_HEADER_EXTERNAL_REFERENCES } from './config';
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
 * @description createExternalReferences
 * @param {*} params
 */
export const createExternalReferences = (params) => {
  const externalReferences = params.items;
  return createTableExternalReferences(externalReferences);
};
