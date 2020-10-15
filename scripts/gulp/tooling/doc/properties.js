/**
 * @name doc/properties.js
 */
import {
  createTarget,
  extractApexDoc,
  getAnnotations,
  getModifiers
} from './common';
import {
  REGEXP_ANNOTATIONS_END_PROPERTY,
  REGEXP_PROPERTY,
  REGEXP_PROPERTY_GET_SET,
  REGEXP_SIGNATURE_END_PROPERTY,
  REGEXP_SIGNATURE_START_PROPERTY,
  REGEXP_TAGS_PROPERTY,
  REGEXP_TAGS_AREA_PROPERTY,
  TABLE_HEADER_PROPERTIES
} from './config';
import { createTable } from './table';

/**
 * @description createTableRowProperty
 * @param {*} params
 */
export const createTableRowProperty = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);

  const row = [];
  row.push(annotations);
  row.push(modifiers);
  row.push(params.type);
  row.push(params.name);
  return row;
};

/**
 * @description _createTableRows
 * @param {*} params
 * @param {*} funcs
 */
const _createTableRows = (params, funcs) => {
  return !params.length
    ? [funcs.createTableRow(params)]
    : params.map((prop) => {
        return funcs.createTableRow(prop);
      });
};

/**
 * @description createTableProperties
 * @param {*} params
 * @param {*} funcs
 */
export const createTableProperties = (params) => {
  return createTable(params, TABLE_HEADER_PROPERTIES, {
    createTableRow: createTableRowProperty,
    createTableRows: _createTableRows
  });
};

/**
 * @description _fetchItem
 * @param {*} prop
 * @param {*} body
 */
const _fetchItem = (prop, body) => {
  const item = body.properties.filter((i) => {
    return prop.name === i.name;
  });
  return !item.length ? null : item[0];
};

/**
 * @description _createTitle
 * @param {*} prop
 */
const _createTitle = (prop) => {
  return { h3: prop.name };
};

/**
 * @description createProperties
 * @param {*} params
 */
export const createProperties = (params) => {
  const properties = params.items;
  const body = params.body;

  return properties.map((prop) => {
    return createTarget(prop, body, {
      fetchItem: _fetchItem,
      createTitle: _createTitle,
      createTableTarget: createTableProperties
    });
  });
};

/**
 * @description _parseBodyProperties
 * @param {*} body
 * @param {*} regexps
 */
const _parseBodyProperties = (body, regexps) => {
  let properties = [];
  regexps.forEach((regexp) => {
    const _properties = extractApexDoc(body, regexp);
    properties = properties.concat(_properties);
  });

  console.log(`\n## Properties`);
  console.log(JSON.stringify(properties));

  return {
    properties: properties
  };
};

/**
 * @description parseBodyProperties
 * @param {*} body
 */
export const parseBodyProperties = (body) => {
  return _parseBodyProperties(body, [
    {
      target: REGEXP_PROPERTY,
      tags: REGEXP_TAGS_PROPERTY,
      tagsArea: REGEXP_TAGS_AREA_PROPERTY,
      annotationsEnd: REGEXP_ANNOTATIONS_END_PROPERTY,
      signatureStart: REGEXP_SIGNATURE_START_PROPERTY,
      signatureEnd: REGEXP_SIGNATURE_END_PROPERTY
    },
    {
      target: REGEXP_PROPERTY_GET_SET,
      tags: REGEXP_TAGS_PROPERTY,
      tagsArea: REGEXP_TAGS_AREA_PROPERTY,
      annotationsEnd: REGEXP_ANNOTATIONS_END_PROPERTY,
      signatureStart: REGEXP_SIGNATURE_START_PROPERTY,
      signatureEnd: REGEXP_SIGNATURE_END_PROPERTY
    }
  ]);
};
