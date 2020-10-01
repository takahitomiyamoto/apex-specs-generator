/**
 * @name apex/config.js
 */
import { getApexClasses, getApexTriggers } from '../../common/lib';

export const HEADERS_CLASS_TABLE = [
  'Annotation',
  'Modifier',
  'Name',
  'Parent Class',
  'Interfaces'
];
export const HEADERS_CONSTRUCTORS_TABLE = ['Modifier', 'Name'];
export const HEADERS_EXTERNAL_REFERENCES_TABLE = [
  'Namespace',
  'Name',
  'Variables',
  'Methods'
];
export const HEADERS_HEADER_TABLE = [
  'Namespace',
  'Manageable State',
  'API Version'
];
export const HEADERS_METHODS_TABLE = ['Annotation', 'Modifier', 'Type', 'Name'];
export const HEADERS_PARAMETERS_TABLE = ['Type', 'Name'];
export const HEADERS_PROPERTIES_TABLE = [
  'Annotations',
  'Modifier',
  'Type',
  'Name'
];
export const HEADERS_TRIGGER_TABLE = [
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
