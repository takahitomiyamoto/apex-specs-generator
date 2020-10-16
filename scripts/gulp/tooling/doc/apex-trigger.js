/**
 * @name doc/apex-trigger.js
 */
import { TABLE_HEADER_TRIGGER } from './config';
import { createTable } from './table';

/**
 * @description _createTableRowTrigger
 * @param {*} params
 */
const _createTableRowTrigger = (params) => {
  const row = [];
  row.push(`${params.usageBeforeInsert ? 'Y' : ''}`);
  row.push(`${params.usageBeforeUpdate ? 'Y' : ''}`);
  row.push(`${params.usageBeforeDelete ? 'Y' : ''}`);
  row.push(`${params.usageAfterInsert ? 'Y' : ''}`);
  row.push(`${params.usageAfterUpdate ? 'Y' : ''}`);
  row.push(`${params.usageAfterDelete ? 'Y' : ''}`);
  row.push(`${params.usageAfterUndelete ? 'Y' : ''}`);
  return row;
};

/**
 * @description createTableTrigger
 * @param {*} params
 */
export const createTableTrigger = (params) => {
  return createTable(params, TABLE_HEADER_TRIGGER, {
    createTableRow: _createTableRowTrigger
  });
};
