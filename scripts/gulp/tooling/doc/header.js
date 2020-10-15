/**
 * @name doc/header.js
 */
import { createTableClass } from './apex-class';
import { createTableTrigger } from './apex-trigger';
import { createTarget, extractApexDoc } from './common';
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
import { createTable } from './table';

/**
 * @description _createTableRow
 * @param {*} params
 */
export const _createTableRow = (params) => {
  const row = [];
  row.push(`${params.namespace}`);
  row.push(`${params.manageableState}`);
  row.push(`${params.apiVersion}`);
  return row;
};

/**
 * @description _createTableRowsHeader
 * @param {*} params
 */
export const _createTableRowsHeader = (params) => {
  const rows = [];
  rows.push(_createTableRow(params));
  return rows;
};

/**
 * @description _fetchItem
 * @param {*} params
 * @param {*} body
 */
const _fetchItem = (params, body) => {
  const item = body.header.filter((i) => {
    return params.name === i.name;
  });
  return !item.length ? null : item[0];
};

/**
 * @description _createTitle
 * @param {*} params
 */
const _createTitle = (params) => {
  return { h2: params.name };
};

/**
 * @description _createTableHeader
 * @param {*} params
 */
const _createTableHeader = (params) => {
  return createTable(params, TABLE_HEADER_HEADER, {
    createTableRow: _createTableRow
  });
};

/**
 * @description _createHeaderArea
 * @param {*} params
 * @param {*} funcs
 */
const _createHeaderArea = (params, funcs) => {
  const body = params.body;
  return createTarget(params, body, {
    fetchItem: _fetchItem,
    createTitle: _createTitle,
    createTableHeader: _createTableHeader,
    createTableTarget: funcs.createTableTarget
  });
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
      return _createHeaderArea(
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
        { createTableTarget: createTableClass }
      );
    case 'ApexTrigger':
      return _createHeaderArea(
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
        { createTableTarget: createTableTrigger }
      );
    default:
      return {};
  }
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
