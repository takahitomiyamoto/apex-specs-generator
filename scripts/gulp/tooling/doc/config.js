/**
 * @name apex/config.js
 */
import { getApexClasses, getApexTriggers } from '../../common/lib';

/*********************
 * common
 *********************/
export const NO_DATA =
  '※ ApexDoc が存在しないか、該当する Signature が見つかりません。';
const ACCESS_MODIFIER = `[private|protected|public|global]*[\\sabstract|\\svirtual|\\soverride]*[\\sstatic|\\stransient]*[\\sfinal]*[with|without|inherited]*[\\ssharing]*`;
const ANNOTATIONS = `[\\@\\w\\(\\=\\'\\/\\)\\n]*`;
const ANNOTATIONS_END = '\\n\\s+';
const ASSIGNED_VALUE = `[\\s\\=\\w\\.\\(\\)<>,]*;\\n`;
const CLASS_OPTIONS = `(extends\\s[\\w<>]+\\s|implements\\s\\w+\\s)*`;
const NAME = `(\\w+)`;
const VALUE = `(.+(\\s\\(\\)\\.<>,:)*)`;
const RETURN_TYPE = `[\\w<>]`;
const TAGS_AREA_START = `\\/\\*+\\n`;
const TAGS_AREA_END = `\\s+\\*+\\/\\n`;
const TAGS_BODY_ITEM = `\\s\\*\\s\\@${NAME}\\s${VALUE}\\n`;
const TAGS_BODY = `([${TAGS_BODY_ITEM}]+)`;
const SIGNATURE_END = '\n$';
const SIGNATURE_START = `^\\s+`;
const SIGNATURE_END_CLASS = `\\s*\\{`;
const TRIGGER_PARAMS = `[\\w\\s\\n,]+`;

// FIXME: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_properties.htm
const GET_SET = `\\s\\{\\s+get;\\sset;\\s\\}\n`;

/*********************
 * target
 *********************/
export const REGEXP_HEADER_CLASS = new RegExp(
  `^${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}` +
    `${ANNOTATIONS}` +
    `${ACCESS_MODIFIER}` +
    `\\sclass\\s${NAME}\\s${CLASS_OPTIONS}${SIGNATURE_END_CLASS}`,
  'g'
);
export const REGEXP_HEADER_TRIGGER = new RegExp(
  `^${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}` +
    `${ANNOTATIONS}` +
    `trigger\\s${NAME}\\son\\s${NAME}\\(${TRIGGER_PARAMS}\\)${SIGNATURE_END_CLASS}`,
  'g'
);
export const REGEXP_INNER_CLASS = new RegExp(
  `\\s+${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}` +
    `\\s+${ANNOTATIONS}` +
    `\\s+${ACCESS_MODIFIER}` +
    `\\sclass\\s${NAME}\\s${CLASS_OPTIONS}${SIGNATURE_END_CLASS}`,
  'g'
);
export const REGEXP_PROPERTIES = new RegExp(
  `\\s+${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}` +
    `\\s+${ANNOTATIONS}` +
    `\\s+${ACCESS_MODIFIER}` +
    `\\s${RETURN_TYPE}+\\s${NAME}${ASSIGNED_VALUE}`,
  'g'
);
export const REGEXP_PROPERTIES_GET_SET = new RegExp(
  `\\s+${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}` +
    `\\s+${ANNOTATIONS}` +
    `\\s+${ACCESS_MODIFIER}` +
    `\\s${RETURN_TYPE}+\\s${NAME}${GET_SET}`,
  'g'
);

/*********************
 * tags
 *********************/
export const REGEXP_TAGS_HEADER = new RegExp(TAGS_BODY_ITEM, 'g');
export const REGEXP_TAGS_INNER_CLASS = new RegExp(TAGS_BODY_ITEM, 'g');
export const REGEXP_TAGS_PROPERTIES = new RegExp(TAGS_BODY_ITEM, 'g');

/*********************
 * tagsArea
 *********************/
export const REGEXP_TAGS_AREA_HEADER = new RegExp(
  `${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}`,
  'g'
);
export const REGEXP_TAGS_AREA_INNER_CLASS = new RegExp(
  `\\s+${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}`,
  'g'
);
export const REGEXP_TAGS_AREA_PROPERTIES = new RegExp(
  `\\s+${TAGS_AREA_START}${TAGS_BODY}${TAGS_AREA_END}`,
  'g'
);

/*********************
 * annotationsEnd
 *********************/
export const REGEXP_ANNOTATIONS_END_HEADER = new RegExp(ANNOTATIONS_END);
export const REGEXP_ANNOTATIONS_END_INNER_CLASS = new RegExp(ANNOTATIONS_END);
export const REGEXP_ANNOTATIONS_END_PROPERTIES = new RegExp(ANNOTATIONS_END);

/*********************
 * signatureStart
 *********************/
export const REGEXP_SIGNATURE_START_HEADER = '';
export const REGEXP_SIGNATURE_START_INNER_CLASS = new RegExp(SIGNATURE_START);
export const REGEXP_SIGNATURE_START_PROPERTIES = new RegExp(SIGNATURE_START);

/*********************
 * signatureEnd
 *********************/
export const REGEXP_SIGNATURE_END_HEADER = new RegExp(
  `${SIGNATURE_END_CLASS}$`
);
export const REGEXP_SIGNATURE_END_INNER_CLASS = new RegExp(
  `${SIGNATURE_END_CLASS}$`
);
export const REGEXP_SIGNATURE_END_PROPERTIES = new RegExp(SIGNATURE_END);

/*********************
 * TABLE_HEADER
 *********************/
export const TABLE_HEADER_APEX_DOC = ['Description'];
export const TABLE_HEADER_HEADER = [
  'Namespace',
  'Manageable State',
  'API Version'
];
export const TABLE_HEADER_CLASS = [
  'Annotation',
  'Modifier',
  'Name',
  'Parent Class',
  'Interfaces'
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
export const TABLE_HEADER_EXTERNAL_REFERENCES = [
  'Namespace',
  'Name',
  'Variables',
  'Methods'
];
export const TABLE_HEADER_PROPERTIES = [
  'Annotations',
  'Modifier',
  'Type',
  'Name'
];
export const TABLE_HEADER_CONSTRUCTORS = ['Modifier', 'Name'];
export const TABLE_HEADER_METHODS = [
  'Annotation',
  'Modifier',
  'Return Type',
  'Name'
];
export const TABLE_HEADER_PARAMETERS = ['Type', 'Name'];

/*********************
 * TITLE
 *********************/
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
