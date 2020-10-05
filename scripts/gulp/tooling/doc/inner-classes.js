/**
 * @name doc/inner-classes.js
 */
import {
  NOT_APPLICABLE,
  REGEXP_INNER_CLASS_DESCRIPTION,
  REGEXP_INNER_CLASS_NAME,
  REGEXP_INNER_CLASS_NAME_PREFIX,
  REGEXP_INNER_CLASS_OTHERS_VALUE_PREFIX,
  REGEXP_INNER_CLASS_OTHERS_KEY,
  REGEXP_INNER_CLASS_OTHERS_KEY_PREFIX,
  REGEXP_INNER_CLASS_OTHERS_KEY_SUFFIX,
  REGEXP_INNER_CLASS_SIGNATURE,
  REGEXP_INNER_CLASS_SIGNATURE_PREFIX,
  REGEXP_INNER_CLASS_SIGNATURE_SUFFIX,
  REGEXP_INNER_CLASS_END,
  TITLE_INNER_CLASSES
} from './config';
import {
  createApexDocArea,
  createCodeClass,
  createTableClass,
  getAnnotations
} from './common';
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
  return item.tags.map((tag) => {
    return `**\`${tag.key}\`** : ${tag.value}`;
  });
};

/**
 * @description _createCodeContentClass
 * @param {*} params
 * @param {*} innerClass
 */
const _createCodeContentClass = (params, innerClass) => {
  const content = [];

  if (params.annotations.length) {
    const annotations = getAnnotations(params.annotations);
    content.push(annotations);
  }

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
        code: createCodeClass(innerClass, item, _createCodeContentClass)
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
  body = body.replace(/\r\n/, /\n/);
  const arrayBody = body.split(/\n/);
  const reversedBody = arrayBody.reverse();

  const innerClass = [];

  let name;
  let signature;
  let tags = [];
  let start = false;
  reversedBody.forEach((line) => {
    if (regexp.regexpSignature.test(line)) {
      name = line
        .match(regexp.regexpName)[0]
        .replace(regexp.regexpNamePrefix, '');
      signature = line
        .replace(regexp.regexpSignaturePrefix, '')
        .replace(regexp.regexpSignatureSuffix, '');
      start = true;
    }
    if (start && regexp.regexpOthersValuePrefix.test(line)) {
      tags.push({
        key: line
          .match(regexp.regexpOthersKey)[0]
          .replace(regexp.regexpOthersKeyPrefix, ''),
        value: line.replace(regexp.regexpOthersValuePrefix, '')
      });
    }
    if (start && regexp.regexpEnd.test(line)) {
      innerClass.push({
        name: name,
        signature: signature,
        tags: tags.reverse()
      });
      name = '';
      signature = '';
      tags = [];
      start = false;
    }
  });

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
    regexpDescription: REGEXP_INNER_CLASS_DESCRIPTION,
    regexpOthersKey: REGEXP_INNER_CLASS_OTHERS_KEY,
    regexpOthersKeyPrefix: REGEXP_INNER_CLASS_OTHERS_KEY_PREFIX,
    regexpOthersKeySuffix: REGEXP_INNER_CLASS_OTHERS_KEY_SUFFIX,
    regexpOthersValuePrefix: REGEXP_INNER_CLASS_OTHERS_VALUE_PREFIX,
    regexpSignature: REGEXP_INNER_CLASS_SIGNATURE,
    regexpSignaturePrefix: REGEXP_INNER_CLASS_SIGNATURE_PREFIX,
    regexpSignatureSuffix: REGEXP_INNER_CLASS_SIGNATURE_SUFFIX,
    regexpName: REGEXP_INNER_CLASS_NAME,
    regexpNamePrefix: REGEXP_INNER_CLASS_NAME_PREFIX,
    regexpEnd: REGEXP_INNER_CLASS_END
  });
};
