/**
 * @name doc/apex-doc.js
 */
import { NO_DATA, TABLE_HEADER_APEX_DOC } from './config';
import { createTable } from './table';

/**
 * @description _createTableRowsApexDoc
 * @param {*} item
 */
const _createTableRowsApexDoc = (item) => {
  const tags = item?.tags;
  if (!tags) {
    return [[NO_DATA]];
  }
  const descriptionTag = tags.filter((tag) => {
    return 'description' === tag.key;
  });

  const value = !descriptionTag.length ? NO_DATA : descriptionTag[0].value;

  return [[value]];
};

/**
 * @description createTableApexDoc
 * @param {*} item
 * @param {*} headers
 */
export const createTableApexDoc = (item) => {
  return createTable(item, TABLE_HEADER_APEX_DOC, {
    createTableRows: _createTableRowsApexDoc
  });
};

/**
 * @description createListApexDoc
 * @param {*} item
 */
export const createListApexDoc = (item) => {
  return !item
    ? {}
    : {
        ul: item.tags.map((tag) => {
          return `**\`${tag.key}\`** : ${tag.value}`;
        })
      };
};
