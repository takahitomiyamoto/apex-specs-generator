/**
 * @name doc/table.js
 */

/**
 * @description _createTableRows
 * @param {*} item
 * @param {*} funcs
 */
const _createTableRows = (item, funcs) => {
  const rows = [];
  rows.push(funcs.createTableRow(item));
  return rows;
};

/**
 * @description createTable
 * @param {*} item
 * @param {*} headers
 * @param {*} funcs
 */
export const createTable = (item, headers, funcs) => {
  const rows = !funcs.createTableRows
    ? _createTableRows(item, funcs)
    : funcs.createTableRows(item, funcs);

  return {
    table: {
      headers: headers,
      rows: rows
    }
  };
};
