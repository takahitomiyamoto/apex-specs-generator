/**
 * @name doc/header.js
 */
import { extractApexDoc } from './common';
import {
  REGEXP_ANNOTATIONS_END_HEADER,
  REGEXP_HEADER_CLASS,
  REGEXP_HEADER_TRIGGER,
  REGEXP_SIGNATURE_END_HEADER,
  REGEXP_SIGNATURE_START_HEADER,
  REGEXP_TAGS_AREA_HEADER,
  REGEXP_TAGS_HEADER,
  TABLE_HEADER_HEADER
} from './config';
import { createHeaderAreaApexClass } from './apex-class';
import { createHeaderAreaTrigger } from './apex-trigger';

/**
 * @description _createTableRowsHeader
 * @param {*} params
 */
export const _createTableRowsHeader = (params) => {
  return [
    [`${params.namespace}`, `${params.manageableState}`, `${params.apiVersion}`]
  ];
};

/**
 * @description _createTableHeader
 * @param {*} params
 * @param {*} funcs
 */
const _createTableHeader = (params, funcs) => {
  return {
    table: {
      headers: TABLE_HEADER_HEADER,
      rows: funcs.createTableRows(params)
    }
  };
};

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
 * @description _createCodeContent
 * @param {*} params
 * @param {*} header
 */
const _createCodeContent = (header) => {
  const content = [];

  content.push(header.signature);
  return content;
};

/**
 * @description _parseBodyHeader
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyHeader = (body, regexp) => {
  const header = extractApexDoc(body, regexp);
  console.log(`\n## Header`);
  console.log(JSON.stringify(header));

  return {
    header: header
  };
};

/**
 * @description createHeaderArea
 * @param {*} params
 */
export const createHeaderArea = (params) => {
  const apex = params.apex;
  const apexMember = params.apexMember;
  const body = params.body;
  // Common
  const namespace = apexMember.namespace;
  const manageableState = apex.ManageableState;
  const apiVersion = apex.ApiVersion.toFixed(1);
  const attributes = apex.attributes;
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
      return createHeaderAreaApexClass(
        {
          namespace: namespace,
          manageableState: manageableState,
          apiVersion: apiVersion,
          annotations: annotations,
          modifiers: modifiers,
          name: name,
          parentClass: parentClass,
          interfaces: interfaces,
          body: body
        },
        {
          createTableHeader: _createTableHeader,
          createTableRows: _createTableRowsHeader,
          createListApexDoc: _createListApexDoc,
          createCodeContent: _createCodeContent
        }
      );
    case 'ApexTrigger':
      return createHeaderAreaTrigger(
        {
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
        },
        {
          createTableHeader: _createTableHeader,
          createTableRows: _createTableRowsHeader,
          createListApexDoc: _createListApexDoc,
          createCodeContent: _createCodeContent
        }
      );
    default:
      return {};
  }
};

/**
 * @description parseBodyHeader
 * @param {*} body
 * @param {*} type
 */
export const parseBodyHeader = (body, type) => {
  return _parseBodyHeader(body, {
    target: 'ApexClass' === type ? REGEXP_HEADER_CLASS : REGEXP_HEADER_TRIGGER,
    tags: REGEXP_TAGS_HEADER,
    tagsArea: REGEXP_TAGS_AREA_HEADER,
    annotationsEnd: REGEXP_ANNOTATIONS_END_HEADER,
    signatureStart: REGEXP_SIGNATURE_START_HEADER,
    signatureEnd: REGEXP_SIGNATURE_END_HEADER
  });
};
