/**
 * @name doc/methods.js
 */
import {
  REGEXP_KEY_START_METHOD,
  REGEXP_METHOD,
  REGEXP_TAGS_METHOD,
  REGEXP_TAGS_AREA_METHOD,
  REGEXP_ANNOTATIONS_END_METHOD,
  REGEXP_SIGNATURE_START_METHOD,
  REGEXP_SIGNATURE_END_METHOD,
  TABLE_HEADER_METHODS
} from './config';
import {
  createTarget,
  extractApexDoc,
  getAnnotations,
  getModifiers
} from './common';
import { createParameters } from './parameters';
import { createTable } from './table';

/**
 * @description _createTableRow
 * @param {*} params
 */
const _createTableRow = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);
  const parameters = !params.parameters.length
    ? '-'
    : createParameters(params.parameters).join(',<br>');

  const row = [];
  row.push(`${annotations}`);
  row.push(`${modifiers}`);
  row.push(`${params.returnType}`);
  row.push(`${params.name}`);
  row.push(`${parameters}`);
  return row;
};

/**
 * @description _createTableMethods
 * @param {*} meth
 */
const _createTableMethods = (meth) => {
  return createTable(meth, TABLE_HEADER_METHODS, {
    createTableRow: _createTableRow
  });
};

/**
 * @description _fetchItem
 * @param {*} meth
 * @param {*} body
 */
const _fetchItem = (meth, body) => {
  const parameters = createParameters(meth.parameters);
  const key = `${meth.name}(${parameters.join(', ')})`;
  const item = body.methods.filter((i) => {
    return key === i.key;
  });
  return !item.length ? null : item[0];
};

/**
 * @description _createTitle
 * @param {*} meth
 */
const _createTitle = (meth) => {
  return { h3: meth.name };
};

/**
 * @description createMethods
 * @param {*} params
 */
export const createMethods = (params) => {
  const methods = params.items;
  const body = params.body;

  return methods.map((meth) => {
    return createTarget(meth, body, {
      fetchItem: _fetchItem,
      createTitle: _createTitle,
      createTableTarget: _createTableMethods
    });
  });
};

/**
 * @description _parseBodyMethods
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyMethods = (body, regexp) => {
  const methods = extractApexDoc(body, regexp);
  console.log(`\n## Methods`);
  console.log(JSON.stringify(methods));

  return {
    methods: methods
  };
};

/**
 * @description parseBodyMethods
 * @param {*} body
 */
export const parseBodyMethods = (body) => {
  return _parseBodyMethods(body, {
    target: REGEXP_METHOD,
    tags: REGEXP_TAGS_METHOD,
    tagsArea: REGEXP_TAGS_AREA_METHOD,
    annotationsEnd: REGEXP_ANNOTATIONS_END_METHOD,
    signatureStart: REGEXP_SIGNATURE_START_METHOD,
    signatureEnd: REGEXP_SIGNATURE_END_METHOD,
    keyStart: REGEXP_KEY_START_METHOD
  });
};
