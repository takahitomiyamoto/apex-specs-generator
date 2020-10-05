/**
 * @name doc/apex-class.js
 */
import {
  createApexDocArea,
  createCodeClass,
  createTableClass,
  getAnnotations
} from './common';

/**
 * @description _createCodeContentClass
 * @param {*} params
 */
const _createCodeContentClass = (params, body) => {
  const content = [];

  if (params.annotations.length) {
    const annotations = getAnnotations(params.annotations);
    content.push(annotations);
  }

  content.push(body.header.signature);
  return content;
};

/**
 * @description createHeaderAreaApexClass
 * @param {*} params
 * @param {*} funcs
 */
export const createHeaderAreaApexClass = (params, funcs) => {
  return [
    {
      table: funcs.createTableHeader(params)
    },
    {
      table: createTableClass(params)
    },
    createApexDocArea(
      params.body,
      funcs.createTableRowsApexDoc,
      funcs.createListApexDoc
    ),
    {
      code: createCodeClass(params, params.body, _createCodeContentClass)
    }
  ];
};
