/**
 * @name doc/inner-constructors.js
 */
import { TABLE_HEADER_CONSTRUCTORS, TITLE_CONSTRUCTORS } from './config';
import { getAnnotations, getModifiers } from './common';

/**
 * @description _createTableRowsInnerConstructors
 * @param {*} params
 */
const _createTableRowsInnerConstructors = (params) => {
  return params.map((cons) => {
    const annotations = getAnnotations(cons.annotations);
    const modifiers = getModifiers(cons.modifiers);
    return [`${annotations}`, `${modifiers}`, `${cons.name}`];
  });
};

/**
 * @description _createTableInnerProperties
 * @param {*} params
 * @param {*} funcs
 */
const _createTableInnerConstructors = (params, funcs) => {
  return {
    table: {
      headers: TABLE_HEADER_CONSTRUCTORS,
      rows: funcs.createTableRows(params)
    }
  };
};

/**
 * @description createInnerConstructorsArea
 * @param {*} params
 */
export const createInnerConstructorsArea = (params) => {
  const result = [];
  result.push({ h4: TITLE_CONSTRUCTORS });

  if (!params.length) {
    return [];
  }

  result.push(
    _createTableInnerConstructors(params, {
      createTableRows: _createTableRowsInnerConstructors
    })
  );

  return result;
};
