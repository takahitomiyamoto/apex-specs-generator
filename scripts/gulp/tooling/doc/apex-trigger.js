/**
 * @name doc/apex-trigger.js
 */
import { TABLE_HEADER_TRIGGER } from './config';
import { createApexDocArea, createCode } from './common';

/**
 * @description _createTableRowsTrigger
 * @param {*} params
 */
export const _createTableRowsTrigger = (params) => {
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
 */
const _createTableTrigger = (params) => {
  return {
    headers: TABLE_HEADER_TRIGGER,
    rows: _createTableRowsTrigger(params)
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
    {
      table: funcs.createTableHeader(params)
    },
    {
      table: _createTableTrigger(params)
    },
    createApexDocArea(item, funcs),
    {
      code: createCode(params, item, funcs.createCodeContent)
    }
  ];
};
