/**
 * @name doc/common.js
 */
import { createListApexDoc, createTableApexDoc } from './apex-doc';
import { createCode } from './code';
import {
  REGEXP_PARAM_LIST_TYPE,
  REGEXP_PARAM_LEFT_PARENTHESIS,
  REGEXP_PARAM_RIGHT_PARENTHESIS,
  REGEXP_PARAM_COMMA,
  convert,
  escapeUnderscore
} from './config';

/**
 * @description getAnnotationNames
 * @param {*} annotations
 */
const getAnnotationNames = (annotations) => {
  if (!annotations.length) {
    return ['-'];
  }
  return annotations.map((anno) => {
    return `@${anno.name}`;
  });
};

/**
 * @name getAnnotations
 * @param {*} annotations
 */
export const getAnnotations = (annotations) => {
  return convert(getAnnotationNames(annotations).join(' '));
};

/**
 * @description getModifierItems
 * @param {*} modifiers
 */
const getModifierItems = (modifiers) => {
  if (!modifiers.length) {
    return ['-'];
  }
  return modifiers.map((modi) => {
    return modi;
  });
};

/**
 * @name getModifiers
 * @param {*} modifiers
 */
export const getModifiers = (modifiers) => {
  return convert(getModifierItems(modifiers).join(' '));
};

/**
 * @description getInterfaceNames
 * @param {*} interfaces
 */
export const getInterfaceNames = (interfaces) => {
  if (!interfaces.length) {
    return ['-'];
  }
  return interfaces.map((inte) => {
    return inte.name;
  });
};

/**
 * @description getMethodNames
 * @param {*} methods
 */
const getMethodNames = (methods) => {
  if (!methods.length) {
    return ['-'];
  }
  return methods.map((meth) => {
    return meth.name;
  });
};

/**
 * @name getMethods
 * @param {*} methods
 */
export const getMethods = (methods) => {
  return getMethodNames(methods).join(',<br>');
};

/**
 * @description getVariableNames
 * @param {*} variables
 */
const getVariableNames = (variables) => {
  if (!variables.length) {
    return ['-'];
  }
  return variables.map((vari) => {
    return vari.name;
  });
};

/**
 * @description getVariables
 * @param {*} variables
 */
export const getVariables = (variables) => {
  return escapeUnderscore(getVariableNames(variables).join(',<br>'));
};

/**
 * @description fetchTag
 * @param {*} arrayBody
 * @param {*} regexp
 */
export const fetchTag = (arrayBody, regexpValue) => {
  let tag = '';
  arrayBody.forEach((line) => {
    if (regexpValue.test(line)) {
      tag = line.replace(regexpValue, '');
    }
  });
  return tag;
};

/**
 * @description extractApexDoc
 * @param {*} body
 * @param {*} regexp
 */
export const extractApexDoc = (body, regexp) => {
  body = body.replace(/\r\n?/g, '\n');
  const targetRaws = body.match(regexp.target);
  return !targetRaws
    ? []
    : targetRaws.map((raw) => {
        const rawTags = raw.replace(regexp.target, '$1').match(regexp.tags);
        const tags = !rawTags
          ? []
          : rawTags.map((tag) => {
              return {
                key: tag.replace(regexp.tags, '$1'),
                value: tag.replace(regexp.tags, '$2')
              };
            });
        const name = raw.replace(regexp.target, '$2');
        const signature = raw
          .replace(regexp.tagsArea, '')
          .replace(regexp.annotationsEnd, '\n')
          .replace(regexp.signatureStart, '')
          .replace(regexp.signatureEnd, '');
        const key = signature
          .replace(regexp.keyStart, '')
          .replace(REGEXP_PARAM_LIST_TYPE, '')
          .replace(REGEXP_PARAM_LEFT_PARENTHESIS, '(')
          .replace(REGEXP_PARAM_RIGHT_PARENTHESIS, ')')
          .replace(REGEXP_PARAM_COMMA, ', ');

        return {
          tags: tags,
          name: name,
          signature: signature,
          key: key
        };
      });
};

/**
 * @description createTarget
 * @param {*} body
 * @param {*} params
 * @param {*} funcs
 */
export const createTarget = (params, body, funcs) => {
  const item = funcs.fetchItem(params, body);

  const result = [];
  result.push(funcs.createTitle(params));
  result.push(createTableApexDoc(item));
  result.push(
    !funcs.createTableHeader ? { p: '' } : funcs.createTableHeader(params)
  );
  result.push(funcs.createTableTarget(params));
  result.push(createListApexDoc(item));
  result.push(createCode(item));

  return result;
};
