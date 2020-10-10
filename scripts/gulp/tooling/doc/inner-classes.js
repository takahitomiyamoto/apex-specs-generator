/**
 * @name doc/inner-classes.js
 */
import { createTableApexDoc, createCode, extractApexDoc } from './common';
import {
  NOT_APPLICABLE,
  REGEXP_INNER_CLASS_TAGS_AREA,
  REGEXP_INNER_CLASS,
  REGEXP_INNER_CLASS_SIGNATURE_START,
  REGEXP_INNER_CLASS_SIGNATURE_END,
  REGEXP_INNER_CLASS_TAGS,
  TITLE_INNER_CLASSES
} from './config';
import { createTableClass, createTableRowsClass } from './apex-class';
import { createInnerPropertiesArea } from './inner-properties';

/**
 * @description _createListApexDoc
 * @param {*} item
 */
const _createListApexDoc = (item) => {
  return {
    ul: item.tags.map((tag) => {
      return `**\`${tag.key}\`** : ${tag.value}`;
    })
  };
};

/**
 * @description _createCodeContentClass
 * @param {*} params
 * @param {*} innerClass
 */
const _createCodeContentClass = (innerClass) => {
  const content = [];

  content.push(innerClass.signature);
  return content;
};

/**
 * @description _createInnerClasses
 * @param {*} params
 */
const _createInnerClasses = (params) => {
  const innerClasses = params.innerClasses;
  const body = params.body;

  return innerClasses.map((inne) => {
    const innerClass = {
      annotations: inne.tableDeclaration.annotations,
      modifiers: inne.tableDeclaration.modifiers,
      name: inne.name,
      parentClass: inne.parentClass,
      interfaces: inne.interfaces
    };

    let item = body.innerClasses.filter((i) => {
      return inne.name === i.name;
    });

    const result = [];

    result.push([
      { h3: inne.name },
      createTableApexDoc(item),
      createTableClass(innerClass, {
        createTableRows: createTableRowsClass
      }),
      createInnerPropertiesArea(inne.properties)
    ]);

    if (!item.length) {
      return result;
    }

    item = item[0];

    result.push([
      _createListApexDoc(item),
      createCode(item, _createCodeContentClass)
    ]);

    return result;
  });
};

/**
 * @description createInnerClassesArea
 * @param {*} params
 */
export const createInnerClassesArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_INNER_CLASSES });

  if (!params.innerClasses.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(_createInnerClasses(params));
  }

  return result;
};

/**
 * @description _parseBodyInnerClasses
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyInnerClasses = (body, regexp) => {
  const innerClasses = extractApexDoc(body, regexp);
  console.log(`\n## Inner Class`);
  console.log(JSON.stringify(innerClasses));

  return {
    innerClasses: innerClasses
  };
};

/**
 * @description parseBodyInnerClasses
 * @param {*} body
 */
export const parseBodyInnerClasses = (body) => {
  return _parseBodyInnerClasses(body, {
    target: REGEXP_INNER_CLASS,
    signatureStart: REGEXP_INNER_CLASS_SIGNATURE_START,
    signatureEnd: REGEXP_INNER_CLASS_SIGNATURE_END,
    tags: REGEXP_INNER_CLASS_TAGS,
    tagsArea: REGEXP_INNER_CLASS_TAGS_AREA
  });
};
