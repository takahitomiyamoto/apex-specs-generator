/**
 * @name doc/common.js
 */
import { HEADERS_CLASS_TABLE, convert, escapeUnderscore } from './config';

/**
 * @description getAnnotationNames
 * @param {*} modifiers
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
const getInterfaceNames = (interfaces) => {
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
 * @description createClassCodeContent
 * @param {*} params
 */
export const createClassCodeContent = (params) => {
  const content = [];

  if (params.annotations.length) {
    const annotations = getAnnotations(params.annotations);
    content.push(annotations);
  }

  let contentMain;
  if (params.modifiers.length) {
    const modifiers = getModifiers(params.modifiers);
    contentMain = `${modifiers} class ${params.name}`;
  } else {
    contentMain = `class ${params.name}`;
  }
  if (params.parentClass) {
    contentMain += ` extends ${params.parentClass}`;
  }
  if (params.interfaces.length) {
    const interfaces = getInterfaceNames(params.interfaces).join(', ');
    contentMain += ` implements ${interfaces}`;
  }
  content.push(contentMain);

  return content;
};

/**
 * @description createClassCode
 * @param {*} params
 */
export const createClassCode = (params) => {
  return {
    language: 'java',
    content: createClassCodeContent(params)
  };
};

/**
 * @description createClassTableRows
 * @param {*} params
 */
export const createClassTableRows = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);
  const parentClass = !params.parentClass ? '-' : params.parentClass;
  const interfaces = getInterfaceNames(params.interfaces).join(', ');
  return [
    [
      `${annotations}`,
      `${modifiers}`,
      `${params.name}`,
      `${parentClass}`,
      `${interfaces}`
    ]
  ];
};

/**
 * @description createClassTable
 * @param {*} params
 */
export const createClassTable = (params) => {
  return {
    headers: HEADERS_CLASS_TABLE,
    rows: createClassTableRows(params)
  };
};
