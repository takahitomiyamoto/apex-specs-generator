/**
 * @name doc/header.js
 */
import {
  REGEXP_HEADER_TAGS_START,
  REGEXP_HEADER_SIGNATURE_CLASS,
  REGEXP_HEADER_SIGNATURE_END,
  REGEXP_HEADER_SIGNATURE_TRIGGER,
  REGEXP_HEADER_TAGS,
  TABLE_HEADER_HEADER
} from './config';
import { getAnnotations } from './common';
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
 * @description _createTableHeader
 * @param {*} params
 */
const _createTableHeader = (params) => {
  return {
    headers: TABLE_HEADER_HEADER,
    rows: _createTableRowsHeader(params)
  };
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
 * @description _createCodeContent
 * @param {*} params
 * @param {*} header
 */
const _createCodeContent = (params, header) => {
  const content = [];

  if (params.annotations) {
    const annotations = getAnnotations(params.annotations);
    content.push(annotations);
  }

  content.push(header.signature);
  return content;
};

/**
 * @description _parseBodyHeader
 * @param {*} body
 * @param {*} regexp
 */
const _parseBodyHeader = (body, regexp) => {
  body = body.replace(/\r\n/g, '\n');
  const arrayBody = body.split('\n');
  const reversedBody = arrayBody.reverse();

  const headerBody = body.match(regexp.regexpSignature);

  let name;
  let signature = '';

  name = headerBody[0].replace(regexp.regexpSignature, '$1');
  signature = headerBody[0]
    .replace(regexp.regexpSignatureEnd, '')
    .replace(/\n/g, '')
    .replace(/\s[\s]+/g, ' ')
    .replace(/\(\s/, '(');

  const header = [];
  let tags = [];

  reversedBody.forEach((line) => {
    if (regexp.regexpTags.test(line)) {
      tags.push({
        key: line.replace(regexp.regexpTags, '$1'),
        value: line.replace(regexp.regexpTags, '$2')
      });
    }
    if (regexp.regexpTagsStart.test(line)) {
      header.push({
        name: name,
        signature: signature,
        tags: tags.reverse()
      });
      name = '';
      signature = '';
      tags = [];
    }
  });

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
          createTableRowsApexDoc: _createTableRowsApexDoc,
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
          createTableRowsApexDoc: _createTableRowsApexDoc,
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
    regexpSignature:
      'ApexClass' === type
        ? REGEXP_HEADER_SIGNATURE_CLASS
        : REGEXP_HEADER_SIGNATURE_TRIGGER,
    regexpSignatureEnd: REGEXP_HEADER_SIGNATURE_END,
    regexpTags: REGEXP_HEADER_TAGS,
    regexpTagsStart: REGEXP_HEADER_TAGS_START
  });
};
