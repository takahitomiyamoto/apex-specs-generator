/**
 * @name doc/apex-class.js
 */
import { getAnnotations, getModifiers, getInterfaceNames } from './common';
import { TABLE_HEADER_CLASS } from './config';
import { createTable } from './table';

/**
 * @description createTableRowClass
 * @param {*} params
 */
export const createTableRowClass = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);
  const parentClass = !params.parentClass ? '-' : params.parentClass;
  const interfaces = getInterfaceNames(params.interfaces).join(', ');

  const row = [];
  row.push(`${annotations}`);
  row.push(`${modifiers}`);
  row.push(`${params.name}`);
  row.push(`${parentClass}`);
  row.push(`${interfaces}`);
  return row;
};

/**
 * @description createTableClass
 * @param {*} params
 */
export const createTableClass = (params) => {
  return createTable(params, TABLE_HEADER_CLASS, {
    createTableRow: createTableRowClass
  });
};
