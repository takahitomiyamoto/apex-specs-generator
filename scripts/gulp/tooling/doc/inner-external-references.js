/**
 * @name doc/inner-external-references.js
 */
import { TITLE_EXTERNAL_REFERENCES } from './config';
import { createTableExternalReferences } from './external-references';

/**
 * @description createInnerExternalReferencesArea
 * @param {*} params
 */
export const createInnerExternalReferencesArea = (params) => {
  const result = [];
  result.push({ h4: TITLE_EXTERNAL_REFERENCES });

  if (!params.length) {
    return [];
  }

  result.push(createTableExternalReferences(params));

  return result;
};
