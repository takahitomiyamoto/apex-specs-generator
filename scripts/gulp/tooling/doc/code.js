/**
 * @name doc/code.js
 */
import { convertSignature } from './config';

/**
 * @description _createCodeContent
 * @param {*} item
 */
const _createCodeContent = (item) => {
  const content = [];
  const signature = convertSignature(item.signature);
  content.push(signature);
  return content;
};

/**
 * @description createCode
 * @param {*} item
 */
export const createCode = (item) => {
  return !item
    ? { p: '' }
    : {
        code: {
          language: 'java',
          content: _createCodeContent(item)
        }
      };
};
