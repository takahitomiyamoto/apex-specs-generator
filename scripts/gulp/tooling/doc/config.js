/**
 * @name apex/config.js
 */
import { getApexClasses, getApexTriggers } from '../../common/lib';

const REGEXP_CLASS = `\\/\\*+\n([\\w\\s\n*()@<>,.:]+)\\s+\\*\\/\n[\\w\\s\n()@=]*[\\w\\s]+\\sclass\\s(\\w+)\\s`;
const REGEXP_CLASS_OPTIONS = `(extends\\s[\\w<>]+\\s|implements\\s.+\\s)*`;
const REGEXP_INNER_CLASS_START = `\n\\s+`;
const REGEXP_TAGS = `\\s\\*\\s@(\\w+)\\s(.+)`;
const REGEXP_TAGS_AREA = `\\/\\*+\n([\\w\\s\n*()@<>,.:]+)\\s+\\*\\/`;
const REGEXP_TRIGGER = `\\/\\*+\n([\\w\\s\n*()@<>,.:]+)\\s+\\*\\/\n[\\w\\s\n()=@]*trigger\\s(\\w+)\\son\\s\\w+\\([\\w\\s\n,]+\\)`;
const REGEXP_SIGNATURE_END = `\\s\\{`;

export const REGEXP_HEADER_CLASS = new RegExp(
  `^${REGEXP_CLASS}${REGEXP_CLASS_OPTIONS}\\{`,
  'g'
);
export const REGEXP_HEADER_SIGNATURE_END = new RegExp(
  `${REGEXP_SIGNATURE_END}$`
);
export const REGEXP_HEADER_SIGNATURE_START = new RegExp(`^\n`);
export const REGEXP_HEADER_TAGS = new RegExp(REGEXP_TAGS, 'g');
export const REGEXP_HEADER_TAGS_AREA = new RegExp(REGEXP_TAGS_AREA);
export const REGEXP_HEADER_TRIGGER = new RegExp(
  `^${REGEXP_TRIGGER}${REGEXP_SIGNATURE_END}`,
  'g'
);
export const REGEXP_INNER_CLASS = new RegExp(
  `${REGEXP_INNER_CLASS_START}${REGEXP_CLASS}${REGEXP_CLASS_OPTIONS}\\{`,
  'g'
);
export const REGEXP_INNER_CLASS_SIGNATURE_END = new RegExp(
  `${REGEXP_SIGNATURE_END}$`
);
export const REGEXP_INNER_CLASS_SIGNATURE_START = /\n\s+/;
export const REGEXP_INNER_CLASS_TAGS = new RegExp(REGEXP_TAGS, 'g');
export const REGEXP_INNER_CLASS_TAGS_AREA = new RegExp(
  `${REGEXP_INNER_CLASS_START}${REGEXP_TAGS_AREA}`,
  'g'
);

export const TABLE_HEADER_CLASS = [
  'Annotation',
  'Modifier',
  'Name',
  'Parent Class',
  'Interfaces'
];
export const TABLE_HEADER_CONSTRUCTORS = ['Modifier', 'Name'];
export const TABLE_HEADER_EXTERNAL_REFERENCES = [
  'Namespace',
  'Name',
  'Variables',
  'Methods'
];
export const TABLE_HEADER_HEADER = [
  'Namespace',
  'Manageable State',
  'API Version'
];
export const TABLE_HEADER_APEX_DOC = ['Description'];
export const TABLE_HEADER_METHODS = [
  'Annotation',
  'Modifier',
  'Return Type',
  'Name'
];
export const TABLE_HEADER_PARAMETERS = ['Type', 'Name'];
export const TABLE_HEADER_PROPERTIES = [
  'Annotations',
  'Modifier',
  'Type',
  'Name'
];
export const TABLE_HEADER_TRIGGER = [
  'Before Insert',
  'Before Update',
  'Before Delete',
  'After Insert',
  'After Update',
  'After Delete',
  'After Undelete'
];
export const NOT_APPLICABLE = 'N/A';
export const TITLE_CONSTRUCTORS = 'Constructors';
export const TITLE_EXTERNAL_REFERENCES = 'External References';
export const TITLE_INNER_CLASSES = 'Inner Classes';
export const TITLE_METHODS = 'Methods';
export const TITLE_PARAMETERS = 'Parameters';
export const TITLE_PROPERTIES = 'Properties';

/**
 * @description setConfig
 * @param {*} environment
 * @param {*} apexType
 */
export const setConfig = (environment, apexType) => {
  switch (apexType) {
    case 'ApexClass':
      return {
        apexMember: 'ApexClassMember',
        getApex: getApexClasses,
        retrieveLogFile: environment.logs.retrieveApexClasses,
        createLogFile: environment.logs.createApexClassMembers,
        symbolTableFolder: environment.logs.apexClass.symbolTable,
        rawDataFolder: environment.logs.apexClass.rawData,
        docsFolder: environment.docs.apexClass,
        fileExtension: '.cls',
        fields: [
          'Id',
          'Name',
          'ApiVersion',
          'Body',
          'BodyCrc',
          'LengthWithoutComments',
          'ManageableState',
          'NamespacePrefix'
        ]
      };
    case 'ApexTrigger':
      return {
        apexMember: 'ApexTriggerMember',
        getApex: getApexTriggers,
        retrieveLogFile: environment.logs.retrieveApexTriggers,
        createLogFile: environment.logs.createApexTriggerMembers,
        symbolTableFolder: environment.logs.apexTrigger.symbolTable,
        rawDataFolder: environment.logs.apexTrigger.rawData,
        docsFolder: environment.docs.apexTrigger,
        fileExtension: '.trigger',
        fields: [
          'Id',
          'Name',
          'ApiVersion',
          'Body',
          'BodyCrc',
          'EntityDefinition.DeveloperName',
          'EntityDefinition.NamespacePrefix',
          'LengthWithoutComments',
          'ManageableState',
          'Status',
          'UsageAfterDelete',
          'UsageAfterInsert',
          'UsageAfterUndelete',
          'UsageAfterUpdate',
          'UsageBeforeDelete',
          'UsageBeforeInsert',
          'UsageBeforeUpdate',
          'UsageIsBulk'
        ]
      };
    default:
      return {};
  }
};

/**
 * @description convert
 * @param {*} value
 */
export const convert = (value) => {
  switch (value) {
    case 'static public':
      return 'public static';
    case 'static public final':
      return 'public static final';
    case 'private testMethod':
      return 'private';
    case 'private static testMethod':
      return 'static';
    case 'public testMethod with sharing':
      return 'public with sharing';
    case '@IsTest':
      return '@isTest';
    case '@TestSetup':
      return '@testSetup';
    default:
      return value;
  }
};

/**
 * @description escapeUnderscore
 * @param {*} value
 */
export const escapeUnderscore = (value) => {
  return value.replace(/_/g, '\\_');
};
