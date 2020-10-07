/**
 * @name doc/apex-trigger.js
 */
import { TABLE_HEADER_TRIGGER } from './config';
import { createApexDocArea, createCode } from './common';

/**
 * @description _createTableRowsTrigger
 * @param {*} params
 */
const _createTableRowsTrigger = (params) => {
  return [
    [
      `${params.usageBeforeInsert ? 'Y' : ''}`,
      `${params.usageBeforeUpdate ? 'Y' : ''}`,
      `${params.usageBeforeDelete ? 'Y' : ''}`,
      `${params.usageAfterInsert ? 'Y' : ''}`,
      `${params.usageAfterUpdate ? 'Y' : ''}`,
      `${params.usageAfterDelete ? 'Y' : ''}`,
      `${params.usageAfterUndelete ? 'Y' : ''}`
    ]
  ];
};

/**
 * @description _createTableTrigger
 * @param {*} params
 * @param {*} func
 */
const _createTableTrigger = (params, func) => {
  return {
    table: {
      headers: TABLE_HEADER_TRIGGER,
      rows: func.createTableRows(params)
    }
  };
};

/**
 * @description createHeaderAreaTrigger
 * @param {*} params
 * @param {*} funcs
 */
export const createHeaderAreaTrigger = (params, funcs) => {
  const body = params.body;

  const item = body.header.filter((i) => {
    return params.name === i.name;
  })[0];

  return [
    funcs.createTableHeader(params, {
      createTableRows: funcs.createTableRows
    }),
    _createTableTrigger(params, {
      createTableRows: _createTableRowsTrigger
    }),
    createApexDocArea(item, funcs),
    createCode(item, funcs.createCodeContent)
  ];
};
