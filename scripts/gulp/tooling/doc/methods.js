/**
 * @name doc/methods.js
 */
import { NOT_APPLICABLE, TITLE_METHODS, HEADERS_METHODS_TABLE } from './config';
import { getAnnotations, getModifiers } from './common';
import { createParameters, createParametersArea } from './parameters';

/**
 * @description createMethodsTableRows
 * @param {*} params
 */
const createMethodsTableRows = (params) => {
  return [
    [
      `${getAnnotations(params.annotations)}`,
      `${getModifiers(params.modifiers)}`,
      `${params.returnType}`,
      `${params.name}`
    ]
  ];
};

/**
 * @description createMethodsTable
 * @param {*} params
 */
const createMethodsTable = (params) => {
  return {
    headers: HEADERS_METHODS_TABLE,
    rows: createMethodsTableRows(params)
  };
};

/**
 * @description setMethodsCodeContent
 * @param {*} params
 * @param {*} parameters
 */
const setMethodsCodeContent = (params, parameters) => {
  const content = [];

  if (params.annotations.length) {
    const annotations = getAnnotations(params.annotations);
    content.push(annotations);
  }

  let contentMain = `${getModifiers(params.modifiers)} ${params.returnType} ${
    params.name
  }(${parameters.join(', ')})`;
  content.push(contentMain);

  return content;
};

/**
 * @description setMethodsCode
 * @param {*} params
 * @param {*} parameters
 */
const setMethodsCode = (params, parameters) => {
  return {
    language: 'java',
    content: setMethodsCodeContent(params, parameters)
  };
};

/**
 * @description createMethods
 * @param {*} params
 */
const createMethods = (params) => {
  return params.map((meth) => {
    const parameters = createParameters(meth.parameters);
    return [
      { h3: meth.name },
      {
        table: createMethodsTable(meth)
      },
      createParametersArea(meth.parameters),
      {
        code: setMethodsCode(meth, parameters)
      }
    ];
  });
};

/**
 * @description createMethodsArea
 * @param {*} params
 */
export const createMethodsArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_METHODS });

  if (!params.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(createMethods(params));
  }

  return result;
};
