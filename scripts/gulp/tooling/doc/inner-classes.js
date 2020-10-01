/**
 * @name doc/inner-classes.js
 */
import { NOT_APPLICABLE, TITLE_INNER_CLASSES } from './config';
import { createClassCode, createClassTable } from './common';
import { createInnerPropertiesArea } from './inner-properties';

/**
 * @description createInnerClasses
 * @param {*} params
 */
const createInnerClasses = (params) => {
  return params.map((inne) => {
    const annotations = inne.tableDeclaration.annotations;
    const modifiers = inne.tableDeclaration.modifiers;
    const name = inne.name;
    const parentClass = inne.parentClass;
    const interfaces = inne.interfaces;

    return [
      { h3: inne.name },
      {
        table: createClassTable({
          annotations: annotations,
          modifiers: modifiers,
          name: name,
          parentClass: parentClass,
          interfaces: interfaces
        })
      },
      createInnerPropertiesArea(inne.properties),
      {
        code: createClassCode({
          annotations: annotations,
          modifiers: modifiers,
          name: name,
          parentClass: parentClass,
          interfaces: interfaces
        })
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

  if (!params.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(createInnerClasses(params));
  }

  return result;
};
