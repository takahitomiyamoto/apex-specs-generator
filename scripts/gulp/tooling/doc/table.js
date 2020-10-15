/**
 * @name doc/table.js
 */

/**
 * @description createTableRows
 * @param {*} item
 * @param {*} funcs
 */
export const createTableRows = (item, funcs) => {
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
    ? createTableRows(item, funcs)
    : funcs.createTableRows(item, funcs);

  return {
    table: {
      headers: headers,
      rows: rows
    }
  };
};
