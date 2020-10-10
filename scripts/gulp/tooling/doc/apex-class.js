/**
 * @name doc/apex-class.js
 */
import { TABLE_HEADER_CLASS } from './config';
import {
  createCode,
  createTableApexDoc,
  getAnnotations,
  getModifiers,
  getInterfaceNames
} from './common';

/**
 * @description createTableRowsClass
 * @param {*} params
 */
export const createTableRowsClass = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);
  const parentClass = !params.parentClass ? '-' : params.parentClass;
  const interfaces = getInterfaceNames(params.interfaces).join(', ');
  return [
    [
      `${annotations}`,
      `${modifiers}`,
      `${params.name}`,
      `${parentClass}`,
      `${interfaces}`
    ]
  ];
};

/**
 * @description createTableClass
 * @param {*} params
 * @param {*} funcs
 */
export const createTableClass = (params, funcs) => {
  return {
    table: {
      headers: TABLE_HEADER_CLASS,
      rows: funcs.createTableRows(params)
    }
  };
};

/**
 * @description createHeaderAreaApexClass
 * @param {*} params
 * @param {*} funcs
 */
export const createHeaderAreaApexClass = (params, funcs) => {
  const body = params.body;

  let item = body.header.filter((i) => {
    return params.name === i.name;
  });

  const result = [];

  result.push([
    createTableApexDoc(item),
    funcs.createTableHeader(params, {
      createTableRows: funcs.createTableRows
    }),
    createTableClass(params, {
      createTableRows: createTableRowsClass
    })
  ]);

  if (!item.length) {
    return result;
  }

  item = item[0];

  result.push([
    funcs.createListApexDoc(item),
    createCode(item, funcs.createCodeContent)
  ]);

  return result;
};
