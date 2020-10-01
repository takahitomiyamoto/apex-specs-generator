/**
 * @name doc/properties.js
 */
import {
  NOT_APPLICABLE,
  HEADERS_PROPERTIES_TABLE,
  TITLE_PROPERTIES
} from './config';
import { getAnnotations, getModifiers } from './common';

/**
 * @description createClassTableRows
 * @param {*} params
 */
const createClassTableRows = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);
  return [
    [`${annotations}`, `${modifiers}`, `${params.type}`, `${params.name}`]
  ];
};

/**
 * @description setPropertyTable
 * @param {*} params
 */
const setPropertyTable = (params) => {
  return {
    headers: HEADERS_PROPERTIES_TABLE,
    rows: createClassTableRows(params)
  };
};

/**
 * @description createPropertyCodeContent
 * @param {*} params
 */
const createPropertyCodeContent = (params) => {
  const content = [];

  if (params.annotations.length) {
    const annotations = getAnnotations(params.annotations);
    content.push(annotations);
  }

  let contentMain = `${getModifiers(params.modifiers)} ${params.type} ${
    params.name
  }`;
  content.push(contentMain);

  return content;
};

/**
 * @description setPropertyCode
 * @param {*} params
 */
const setPropertyCode = (params) => {
  return {
    language: 'java',
    content: createPropertyCodeContent(params)
  };
};

/**
 * @description createProperties
 * @param {*} params
 */
const createProperties = (params) => {
  return params.map((prop) => {
    return [
      { h3: prop.name },
      {
        table: setPropertyTable(prop)
      },
      {
        code: setPropertyCode(prop)
      }
    ];
  });
};

/**
 * @description createPropertiesArea
 * @param {*} params
 */
export const createPropertiesArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_PROPERTIES });

  if (!params.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(createProperties(params));
  }

  return result;
};
