/**
 * @name doc/inner-classes.js
 */
import {
  NOT_APPLICABLE,
  REGEXP_INNER_CLASS_TAGS_AREA,
  REGEXP_INNER_CLASS,
  REGEXP_INNER_CLASS_SIGNATURE_START,
  REGEXP_INNER_CLASS_SIGNATURE_END,
  REGEXP_INNER_CLASS_TAGS,
  TITLE_INNER_CLASSES
} from './config';
import { createApexDocArea, createCode, createTableClass } from './common';
import { createInnerPropertiesArea } from './inner-properties';

/**
 * @description _createTableRowsApexDoc
 * @param {*} item
 */
const _createTableRowsApexDoc = (item) => {
  const descriptionTag = item.tags.filter((tag) => {
    return 'description' === tag.key;
  })[0];
  return [[`${descriptionTag.value}`]];
};

/**
 * @description _createListApexDoc
 * @param {*} item
 */
const _createListApexDoc = (item) => {
  const tags = item.tags;
  return tags.map((tag) => {
    return `**\`${tag.key}\`** : ${tag.value}`;
  });
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

    const item = body.innerClass.filter((i) => {
      return inne.name === i.name;
    })[0];

    return [
      { h3: inne.name },
      {
        table: createTableClass(innerClass)
      },
      createInnerPropertiesArea(inne.properties),
      createApexDocArea(item, {
        createTableRowsApexDoc: _createTableRowsApexDoc,
        createListApexDoc: _createListApexDoc
      }),
      {
        code: createCode(item, _createCodeContentClass)
      }
    ];
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
 * @description _parseBodyInnerClass
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyInnerClass = (body, regexp) => {
  body = body.replace(/\r\n/g, '\n');
  const innerClassRaws = body.match(regexp.innerClass);

  const innerClass = !innerClassRaws
    ? []
    : innerClassRaws.map((raw) => {
        return {
          tags: raw
            .replace(regexp.innerClass, '$1')
            .match(regexp.tags)
            .map((tag) => {
              return {
                key: tag.replace(regexp.tags, '$1'),
                value: tag.replace(regexp.tags, '$2')
              };
            }),
          name: raw.replace(regexp.innerClass, '$2'),
          signature: raw
            .replace(regexp.tagsArea, '')
            .replace(regexp.signatureStart, '')
            .replace(regexp.signatureEnd, '')
        };
      });

  console.log(`\n## Inner Class`);
  console.log(JSON.stringify(innerClass));

  return {
    innerClass: innerClass
  };
};

/**
 * @description parseBodyInnerClass
 * @param {*} body
 */
export const parseBodyInnerClass = (body) => {
  return _parseBodyInnerClass(body, {
    innerClass: REGEXP_INNER_CLASS,
    signatureStart: REGEXP_INNER_CLASS_SIGNATURE_START,
    signatureEnd: REGEXP_INNER_CLASS_SIGNATURE_END,
    tags: REGEXP_INNER_CLASS_TAGS,
    tagsArea: REGEXP_INNER_CLASS_TAGS_AREA
  });
};
