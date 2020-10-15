/**
 * @name doc/constructors.js
 */
import {
  NOT_APPLICABLE,
  REGEXP_CONSTRUCTOR,
  REGEXP_TAGS_CONSTRUCTOR,
  REGEXP_TAGS_AREA_CONSTRUCTOR,
  REGEXP_ANNOTATIONS_END_CONSTRUCTOR,
  REGEXP_SIGNATURE_START_CONSTRUCTOR,
  REGEXP_SIGNATURE_END_CONSTRUCTOR,
  TABLE_HEADER_CONSTRUCTORS,
  TITLE_CONSTRUCTORS
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
 * @description createTableRowConstructors
 * @param {*} cons
 */
export const createTableRowConstructors = (cons) => {
  const annotations = getAnnotations(cons.annotations);
  const modifiers = getModifiers(cons.modifiers);
  const parameters = !cons.parameters.length
    ? '-'
    : createParameters(cons.parameters).join(',<br>');

  const row = [];
  row.push(`${annotations}`);
  row.push(`${modifiers}`);
  row.push(`${cons.name}`);
  row.push(`${parameters}`);
  return row;
};

/**
 * @description createTableRowsConstructors
 * @param {*} params
 * @param {*} funcs
 */
export const createTableRowsConstructors = (params, funcs) => {
  return !params.length
    ? [funcs.createTableRow(params)]
    : params.map((cons) => {
        return funcs.createTableRow(cons);
      });
};

/**
 * @description createTableConstructors
 * @param {*} params
 */
export const createTableConstructors = (params) => {
  return createTable(params, TABLE_HEADER_CONSTRUCTORS, {
    createTableRow: createTableRowConstructors,
    createTableRows: createTableRowsConstructors
  });
};

/**
 * @description _fetchItem
 * @param {*} cons
 * @param {*} body
 */
const _fetchItem = (cons, body) => {
  const parameters = createParameters(cons.parameters);
  const modifiers = getModifiers(cons.modifiers);
  const signature = `${modifiers} ${cons.name}(${parameters.join(', ')})`;
  const item = body.constructors.filter((i) => {
    return signature === i.signature;
  });
  return !item.length ? null : item[0];
};

/**
 * @description _createTitle
 * @param {*} cons
 */
const _createTitle = (cons) => {
  return { h3: cons.name };
};

/**
 * @description _createConstructors
 * @param {*} params
 */
const _createConstructors = (params) => {
  const constructors = params.constructors;
  const body = params.body;

  return constructors.map((cons) => {
    return createTarget(cons, body, {
      fetchItem: _fetchItem,
      createTitle: _createTitle,
      createTableTarget: createTableConstructors
    });
  });
};

/**
 * @description createConstructorsArea
 * @param {*} params
 */
export const createConstructorsArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_CONSTRUCTORS });

  if (!params.constructors.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(_createConstructors(params));
  }

  return result;
};

/**
 * @description _parseBodyConstructors
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyConstructors = (body, regexp) => {
  const constructors = extractApexDoc(body, regexp);
  console.log(`\n## Constructors`);
  console.log(JSON.stringify(constructors));

  return {
    constructors: constructors
  };
};

/**
 * @description parseBodyConstructors
 * @param {*} body
 */
export const parseBodyConstructors = (body) => {
  return _parseBodyConstructors(body, {
    target: REGEXP_CONSTRUCTOR,
    tags: REGEXP_TAGS_CONSTRUCTOR,
    tagsArea: REGEXP_TAGS_AREA_CONSTRUCTOR,
    annotationsEnd: REGEXP_ANNOTATIONS_END_CONSTRUCTOR,
    signatureStart: REGEXP_SIGNATURE_START_CONSTRUCTOR,
    signatureEnd: REGEXP_SIGNATURE_END_CONSTRUCTOR
  });
};
