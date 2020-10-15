/**
 * @name doc/parameters.js
 */

/**
 * @description createParameters
 * @param {*} parameters
 */
export const createParameters = (parameters) => {
  return parameters.map((para) => {
    return `${para.type} ${para.name}`;
  });
};
