/**
 * @name doc/apex-class.js
 */
import { createApexDocArea, createCode, createTableClass } from './common';

/**
 * @description createHeaderAreaApexClass
 * @param {*} params
 * @param {*} funcs
 */
export const createHeaderAreaApexClass = (params, funcs) => {
  const body = params.body;

  const item = body.header.filter((i) => {
    return params.name === i.name;
  })[0];

  return [
    {
      table: funcs.createTableHeader(params)
    },
    {
      table: createTableClass(params)
    },
    createApexDocArea(item, funcs),
    {
      code: createCode(params, item, funcs.createCodeContent)
    }
  ];
};
