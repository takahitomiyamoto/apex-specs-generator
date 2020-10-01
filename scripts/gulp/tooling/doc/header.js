/**
 * @name doc/header.js
 */
import { HEADERS_HEADER_TABLE, HEADERS_TRIGGER_TABLE } from './config';
import { createClassCode, createClassTable } from './common';

/**
 * @description createHeaderTable
 * @param {*} params
 */
const createHeaderTable = (params) => {
  return {
    headers: HEADERS_HEADER_TABLE,
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
 * @description createTriggerTable
 * @param {*} params
 */
const createTriggerTable = (params) => {
  return {
    headers: HEADERS_TRIGGER_TABLE,
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
 * @description createTriggerCodeContent
 * @param {*} params
 */
const createTriggerCodeContent = (params) => {
  return [`trigger ${params.name} on ${params.entityDefinition.DeveloperName}`];
};

/**
 * @description createTriggerCode
 * @param {*} params
 */
const createTriggerCode = (params) => {
  return {
    language: 'java',
    content: createTriggerCodeContent(params)
  };
};

/**
 * @description createHeaderAreaApexClass
 * @param {*} params
 */
const createHeaderAreaApexClass = (params) => {
  return [
    {
      table: createHeaderTable(params)
    },
    {
      table: createClassTable(params)
    },
    {
      code: createClassCode(params)
    }
  ];
};

/**
 * @description createHeaderAreaApexTrigger
 * @param {*} params
 */
const createHeaderAreaApexTrigger = (params) => {
  return [
    {
      table: createHeaderTable(params)
    },
    {
      table: createTriggerTable(params)
    },
    {
      code: createTriggerCode(params)
    }
  ];
};

/**
 * @description createHeaderArea
 * @param {*} jsonApex
 * @param {*} jsonApexMember
 */
export const createHeaderArea = (jsonApex, jsonApexMember) => {
  // Common
  const namespace = jsonApexMember.namespace;
  const manageableState = jsonApex.ManageableState;
  const apiVersion = jsonApex.ApiVersion.toFixed(1);
  const attributes = jsonApex.attributes;
  const table = jsonApexMember.tableDeclaration;
  const name = table.name;
  // ApexClass
  const annotations = table.annotations;
  const modifiers = table.modifiers;
  const parentClass = jsonApexMember.parentClass;
  const interfaces = jsonApexMember.interfaces;
  // ApexTrigger
  const usageBeforeInsert = jsonApex.UsageBeforeInsert;
  const usageBeforeUpdate = jsonApex.UsageBeforeUpdate;
  const usageBeforeDelete = jsonApex.UsageBeforeDelete;
  const usageAfterInsert = jsonApex.UsageAfterInsert;
  const usageAfterUpdate = jsonApex.UsageAfterUpdate;
  const usageAfterDelete = jsonApex.UsageAfterDelete;
  const usageAfterUndelete = jsonApex.UsageAfterUndelete;
  const entityDefinition = jsonApex.EntityDefinition;

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
        interfaces: interfaces
      });
    case 'ApexTrigger':
      return createHeaderAreaApexTrigger({
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
        entityDefinition: entityDefinition
      });
    default:
      return {};
  }
};
