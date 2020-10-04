/**
 * @name doc/header.js
 */
import { TABLE_HEADER_HEADER, TABLE_HEADER_TRIGGER } from './config';
import {
  createCodeClass,
  createTableClass,
  createTableHeaderApexDoc
} from './common';

/**
 * @description createTableHeader
 * @param {*} params
 */
const createTableHeader = (params) => {
  return {
    headers: TABLE_HEADER_HEADER,
    rows: [
      [
        `${params.namespace}`,
        `${params.manageableState}`,
        `${params.apiVersion}`
      ]
    ]
  };
};

/**
 * @description createTableTrigger
 * @param {*} params
 */
const createTableTrigger = (params) => {
  return {
    headers: TABLE_HEADER_TRIGGER,
    rows: [
      [
        `${params.usageBeforeInsert ? 'Y' : ''}`,
        `${params.usageBeforeUpdate ? 'Y' : ''}`,
        `${params.usageBeforeDelete ? 'Y' : ''}`,
        `${params.usageAfterInsert ? 'Y' : ''}`,
        `${params.usageAfterUpdate ? 'Y' : ''}`,
        `${params.usageAfterDelete ? 'Y' : ''}`,
        `${params.usageAfterUndelete ? 'Y' : ''}`
      ]
    ]
  };
};

/**
 * @description createCodeContentTrigger
 * @param {*} params
 */
const createCodeContentTrigger = (params) => {
  return [`trigger ${params.name} on ${params.entityDefinition.DeveloperName}`];
};

/**
 * @description createCodeTrigger
 * @param {*} params
 */
const createCodeTrigger = (params) => {
  return {
    language: 'java',
    content: createCodeContentTrigger(params)
  };
};

/**
 * @description createHeaderAreaApexClass
 * @param {*} params
 */
const createHeaderAreaApexClass = (params) => {
  return [
    {
      table: createTableHeader(params)
    },
    {
      table: createTableClass(params)
    },
    {
      table: createTableHeaderApexDoc(params)
    },
    {
      code: createCodeClass(params)
    }
  ];
};

/**
 * @description createHeaderAreaTrigger
 * @param {*} params
 */
const createHeaderAreaTrigger = (params) => {
  return [
    {
      table: createTableHeader(params)
    },
    {
      table: createTableTrigger(params)
    },
    {
      table: createTableHeaderApexDoc(params)
    },
    {
      code: createCodeTrigger(params)
    }
  ];
};

/**
 * @description createHeaderArea
 * @param {*} params
 */
export const createHeaderArea = (params) => {
  const apex = params.apex;
  const apexMember = params.apexMember;
  // Common
  const namespace = apexMember.namespace;
  const manageableState = apex.ManageableState;
  const apiVersion = apex.ApiVersion.toFixed(1);
  const attributes = apex.attributes;
  const body = apex.Body;
  const table = apexMember.tableDeclaration;
  const name = table.name;
  // ApexClass
  const annotations = table.annotations;
  const modifiers = table.modifiers;
  const parentClass = apexMember.parentClass;
  const interfaces = apexMember.interfaces;
  // ApexTrigger
  const usageBeforeInsert = apex.UsageBeforeInsert;
  const usageBeforeUpdate = apex.UsageBeforeUpdate;
  const usageBeforeDelete = apex.UsageBeforeDelete;
  const usageAfterInsert = apex.UsageAfterInsert;
  const usageAfterUpdate = apex.UsageAfterUpdate;
  const usageAfterDelete = apex.UsageAfterDelete;
  const usageAfterUndelete = apex.UsageAfterUndelete;
  const entityDefinition = apex.EntityDefinition;

  switch (attributes.type) {
    case 'ApexClass':
      return createHeaderAreaApexClass({
        namespace: namespace,
        manageableState: manageableState,
        apiVersion: apiVersion,
        annotations: annotations,
        modifiers: modifiers,
        name: name,
        parentClass: parentClass,
        interfaces: interfaces,
        body: body
      });
    case 'ApexTrigger':
      return createHeaderAreaTrigger({
        namespace: namespace,
        manageableState: manageableState,
        apiVersion: apiVersion,
        usageBeforeInsert: usageBeforeInsert,
        usageBeforeUpdate: usageBeforeUpdate,
        usageBeforeDelete: usageBeforeDelete,
        usageAfterInsert: usageAfterInsert,
        usageAfterUpdate: usageAfterUpdate,
        usageAfterDelete: usageAfterDelete,
        usageAfterUndelete: usageAfterUndelete,
        name: name,
        entityDefinition: entityDefinition,
        body: body
      });
    default:
      return {};
  }
};
