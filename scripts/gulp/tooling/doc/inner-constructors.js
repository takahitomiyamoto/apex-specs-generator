/**
 * @name doc/inner-constructors.js
 */
import { TITLE_CONSTRUCTORS } from './config';
import {
  createTableConstructors,
  createTableRowsConstructors
} from './constructors';

/**
 * @description _createTableRowsInnerConstructors
 * @param {*} params
 */
const _createTableRowsInnerConstructors = (params) => {
  return params.map((cons) => {
    return createTableRowsConstructors(cons)[0];
  });
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
    createTableConstructors(params, {
      createTableRows: _createTableRowsInnerConstructors
    })
  );

  return result;
};
