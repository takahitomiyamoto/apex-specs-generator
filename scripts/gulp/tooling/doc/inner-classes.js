/**
 * @name doc/inner-classes.js
 */
import { createTableClass } from './apex-class';
import { createTarget, extractApexDoc } from './common';
import {
  REGEXP_ANNOTATIONS_END_INNER_CLASS,
  REGEXP_INNER_CLASS,
  REGEXP_SIGNATURE_START_INNER_CLASS,
  REGEXP_SIGNATURE_END_INNER_CLASS,
  REGEXP_TAGS_INNER_CLASS,
  REGEXP_TAGS_AREA_INNER_CLASS
} from './config';
import { createInnerConstructorsArea } from './inner-constructors';
import { createInnerExternalReferencesArea } from './inner-external-references';
import { createInnerPropertiesArea } from './inner-properties';

/**
 * @description _fetchItem
 * @param {*} body
 * @param {*} inne
 */
const _fetchItem = (params, body) => {
  const item = body.innerClasses.filter((i) => {
    return params.name === i.name;
  });
  return !item.length ? null : item[0];
};

/**
 * @description _createTitle
 * @param {*} inne
 */
const _createTitle = (inne) => {
  return { h3: inne.name };
};

/**
 * @description createInnerClasses
 * @param {*} params
 */
export const createInnerClasses = (params) => {
  const innerClasses = params.items;
  const body = params.body;

  return innerClasses.map((inne) => {
    const innerClass = {
      annotations: inne.tableDeclaration.annotations,
      modifiers: inne.tableDeclaration.modifiers,
      name: inne.name,
      parentClass: inne.parentClass,
      interfaces: inne.interfaces
    };

    const result = [];
    result.push(
      createTarget(innerClass, body, {
        fetchItem: _fetchItem,
        createTitle: _createTitle,
        createTableTarget: createTableClass
      })
    );
    result.push([createInnerExternalReferencesArea(inne.externalReferences)]);
    result.push([createInnerConstructorsArea(inne.constructors)]);
    result.push([createInnerPropertiesArea(inne.properties)]);

    return result;
  });
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
    tags: REGEXP_TAGS_INNER_CLASS,
    tagsArea: REGEXP_TAGS_AREA_INNER_CLASS,
    annotationsEnd: REGEXP_ANNOTATIONS_END_INNER_CLASS,
    signatureStart: REGEXP_SIGNATURE_START_INNER_CLASS,
    signatureEnd: REGEXP_SIGNATURE_END_INNER_CLASS
  });
};
