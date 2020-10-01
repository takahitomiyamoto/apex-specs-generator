/**
 * @name doc/constructors.js
 */
import {
  HEADERS_CONSTRUCTORS_TABLE,
  NOT_APPLICABLE,
  TITLE_CONSTRUCTORS
} from './config';
import { getModifiers } from './common';
import { createParameters, createParametersArea } from './parameters';

/**
 * @description createConstructorsTableRows
 * @param {*} params
 */
const createConstructorsTableRows = (params) => {
  return [[`${getModifiers(params.modifiers)}`, `${params.name}`]];
};

/**
 * @description createConstructorsTable
 * @param {*} params
 */
const createConstructorsTable = (params) => {
  return {
    headers: HEADERS_CONSTRUCTORS_TABLE,
    rows: createConstructorsTableRows(params)
  };
};

/**
 * @description createClassCodeContent
 * @param {*} params
 * @param {*} parameters
 */
const createClassCodeContent = (params, parameters) => {
  return `${getModifiers(params.modifiers)} ${params.name}(${parameters.join(
    ', '
  )})`;
};

/**
 * @description setConstructorsCode
 * @param {*} params
 * @param {*} parameters
 */
const setConstructorsCode = (params, parameters) => {
  return {
    language: 'java',
    content: createClassCodeContent(params, parameters)
  };
};

/**
 * @description createConstructors
 * @param {*} params
 */
const createConstructors = (params) => {
  return params.map((cons) => {
    const parameters = createParameters(cons.parameters);
    return [
      { h3: cons.name },
      {
        table: createConstructorsTable(cons)
      },
      createParametersArea(cons.parameters),
      {
        code: setConstructorsCode(cons, parameters)
      }
    ];
  });
};

/**
 * @description createConstructorsArea
 * @param {*} params
 */
export const createConstructorsArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_CONSTRUCTORS });

  if (!params.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(createConstructors(params));
  }

  return result;
};
