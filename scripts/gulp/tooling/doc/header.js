/**
 * @name doc/header.js
 */
import {
  REGEXP_HEADER_CLASS,
  REGEXP_HEADER_TRIGGER,
  REGEXP_HEADER_SIGNATURE_START,
  REGEXP_HEADER_SIGNATURE_END,
  REGEXP_HEADER_TAGS,
  REGEXP_HEADER_TAGS_AREA,
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
  body = body.replace(/\r\n/g, '\n');

  const headerRaws = body.match(regexp.header);
  const header = !headerRaws
    ? []
    : headerRaws.map((raw) => {
        return {
          tags: raw
            .replace(regexp.header, '$1')
            .match(regexp.tags)
            .map((tag) => {
              return {
                key: tag.replace(regexp.tags, '$1'),
                value: tag.replace(regexp.tags, '$2')
              };
            }),
          name: raw.replace(regexp.header, '$2'),
          signature: raw
            .replace(regexp.tagsArea, '')
            .replace(regexp.signatureStart, '')
            .replace(regexp.signatureEnd, '')
            .replace(/\n/g, '')
            .replace(/\s+/g, ' ')
            .replace(/\(\s/g, '(')
        };
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
    header: 'ApexClass' === type ? REGEXP_HEADER_CLASS : REGEXP_HEADER_TRIGGER,
    signatureStart: REGEXP_HEADER_SIGNATURE_START,
    signatureEnd: REGEXP_HEADER_SIGNATURE_END,
    tags: REGEXP_HEADER_TAGS,
    tagsArea: REGEXP_HEADER_TAGS_AREA
  });
};
