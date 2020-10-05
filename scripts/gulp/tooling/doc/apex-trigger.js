/**
 * @name doc/apex-trigger.js
 */
import { TABLE_HEADER_TRIGGER } from './config';
import { createApexDocArea } from './common';

/**
 * @description _createTableTrigger
 * @param {*} params
 */
const _createTableTrigger = (params) => {
  return {
    headers: TABLE_HEADER_TRIGGER,
    rows: [
      [
        `${params.usageBeforeInsert ? 'Y' : ''}`,
        `${params.usageBeforeUpdate ? 'Y' : ''}`,
        `${params.usageBeforeDelete ? 'Y' : ''}`,
        `${params.usageAfterInsert ? 'Y' : ''}`,
        `${params.usageAfterUpdate ? 'Y' : ''}`,
        `${params.usageAfterDelete ? 'Y' : ''}`,
        `${params.usageAfterUndelete ? 'Y' : ''}`
      ]
    ]
  };
};

/**
 * @description _createCodeContentTrigger
 * @param {*} params
 */
const _createCodeContentTrigger = (params) => {
  return [`trigger ${params.name} on ${params.entityDefinition.DeveloperName}`];
};

/**
 * @description _createCodeTrigger
 * @param {*} params
 */
const _createCodeTrigger = (params) => {
  return {
    language: 'java',
    content: _createCodeContentTrigger(params)
  };
};

/**
 * @description createHeaderAreaTrigger
 * @param {*} params
 * @param {*} funcs
 */
export const createHeaderAreaTrigger = (params, funcs) => {
  return [
    {
      table: funcs.createTableHeader(params)
    },
    {
      table: _createTableTrigger(params)
    },
    createApexDocArea(
      params.body,
      funcs.createTableRowsApexDoc,
      funcs.createListApexDoc
    ),
    {
      code: _createCodeTrigger(params)
    }
  ];
};
