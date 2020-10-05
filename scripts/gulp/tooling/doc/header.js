/**
 * @name doc/header.js
 */
import {
  REGEXP_HEADER_DESCRIPTION,
  REGEXP_HEADER_OTHERS,
  REGEXP_HEADER_OTHERS_KEY_PREFIX,
  REGEXP_HEADER_OTHERS_KEY_SUFFIX,
  REGEXP_HEADER_CLASS_SIGNATURE,
  REGEXP_HEADER_TRIGGER_SIGNATURE,
  REGEXP_HEADER_SIGNATURE_SUFFIX,
  TABLE_HEADER_HEADER
} from './config';
import { fetchTag, fetchTagsHeader, fetchSignatureHeader } from './common';
import { createHeaderAreaApexClass } from './apex-class';
import { createHeaderAreaTrigger } from './apex-trigger';

/**
 * @description _createTableHeader
 * @param {*} params
 */
const _createTableHeader = (params) => {
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
 * @description _createTableRowsApexDoc
 * @param {*} body
 */
const _createTableRowsApexDoc = (body) => {
  return [[`${body.header.description}`]];
};

/**
 * @description _createListApexDoc
 * @param {*} body
 */
const _createListApexDoc = (body) => {
  const tags = body.header.others;
  return tags.map((tag) => {
    return `**\`${tag.key}\`** : ${tag.value}`;
  });
};

/**
 * @description _parseBodyHeader
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyHeader = (body, regexp) => {
  body = body.replace(/\r\n/, /\n/);
  const arrayBody = body.split(/\n/);

  const description = fetchTag(arrayBody, regexp.regexpDescription);

  const others = fetchTagsHeader({
    body: arrayBody,
    regexpValue: regexp.regexpOthers,
    regexpKeyPrefix: regexp.regexpOthersKeyPrefix,
    regexpKeySuffix: regexp.regexpOthersKeySuffix
  });

  const signature = fetchSignatureHeader({
    body: arrayBody,
    regexpValue: regexp.regexpSignature,
    regexpKeyPrefix: '',
    regexpKeySuffix: regexp.regexpSignatureSuffix
  });

  return {
    header: {
      description: description,
      others: others,
      signature: signature
    }
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
          createTableRowsApexDoc: _createTableRowsApexDoc,
          createListApexDoc: _createListApexDoc
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
          createTableRowsApexDoc: _createTableRowsApexDoc,
          createListApexDoc: _createListApexDoc
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
    regexpDescription: REGEXP_HEADER_DESCRIPTION,
    regexpOthers: REGEXP_HEADER_OTHERS,
    regexpOthersKeyPrefix: REGEXP_HEADER_OTHERS_KEY_PREFIX,
    regexpOthersKeySuffix: REGEXP_HEADER_OTHERS_KEY_SUFFIX,
    regexpSignature:
      'ApexClass' === type
        ? REGEXP_HEADER_CLASS_SIGNATURE
        : REGEXP_HEADER_TRIGGER_SIGNATURE,
    regexpSignatureSuffix: REGEXP_HEADER_SIGNATURE_SUFFIX
  });
};
