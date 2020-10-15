/**
 * @name doc/inner-constructors.js
 */
import { TITLE_CONSTRUCTORS } from './config';
import { createTableConstructors } from './constructors';

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

  result.push(createTableConstructors(params));

  return result;
};
