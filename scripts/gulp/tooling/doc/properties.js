/**
 * @name doc/properties.js
 */
import {
  createTableApexDoc,
  createCode,
  extractApexDoc,
  getAnnotations,
  getModifiers
} from './common';
import {
  REGEXP_ANNOTATIONS_END_PROPERTIES,
  REGEXP_PROPERTIES,
  REGEXP_PROPERTIES_GET_SET,
  REGEXP_SIGNATURE_END_PROPERTIES,
  REGEXP_SIGNATURE_START_PROPERTIES,
  REGEXP_PROPERTIES_TAGS,
  REGEXP_PROPERTIES_TAGS_AREA,
  NOT_APPLICABLE,
  TABLE_HEADER_PROPERTIES,
  TITLE_PROPERTIES
} from './config';

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
 * @description _createTableRowsProperty
 * @param {*} params
 */
const _createTableRowsProperty = (params) => {
  const annotations = getAnnotations(params.annotations);
  const modifiers = getModifiers(params.modifiers);
  return [
    [`${annotations}`, `${modifiers}`, `${params.type}`, `${params.name}`]
  ];
};

/**
 * @description _createTableProperty
 * @param {*} params
 * @param {*} funcs
 */
const _createTableProperty = (params, funcs) => {
  return {
    table: {
      headers: TABLE_HEADER_PROPERTIES,
      rows: funcs.createTableRows(params)
    }
  };
};

/**
 * @description _createCodeContentProperty
 * @param {*} properties
 */
const _createCodeContentProperty = (properties) => {
  const content = [];
  content.push(properties.signature);
  return content;
};

/**
 * @description _createProperties
 * @param {*} params
 */
const _createProperties = (params) => {
  const properties = params.properties;
  const body = params.body;

  return properties.map((prop) => {
    let item = body.properties.filter((i) => {
      return prop.name === i.name;
    });

    const result = [];

    result.push([
      { h3: prop.name },
      createTableApexDoc(item),
      _createTableProperty(prop, {
        createTableRows: _createTableRowsProperty
      })
    ]);

    if (!item.length) {
      return result;
    }

    item = item[0];

    result.push([
      _createListApexDoc(item),
      createCode(item, _createCodeContentProperty)
    ]);

    return result;
  });
};

/**
 * @description createPropertiesArea
 * @param {*} params
 */
export const createPropertiesArea = (params) => {
  const result = [];
  result.push({ h2: TITLE_PROPERTIES });

  if (!params.properties.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(_createProperties(params));
  }

  return result;
};

/**
 * @description _parseBodyProperties
 * @param {*} body
 * @param {*} regexps
 */
const _parseBodyProperties = (body, regexps) => {
  let properties = [];
  regexps.forEach((regexp) => {
    const _properties = extractApexDoc(body, regexp);
    properties = properties.concat(_properties);
  });

  console.log(`\n## Properties`);
  console.log(JSON.stringify(properties));

  return {
    properties: properties
  };
};

/**
 * @description parseBodyProperties
 * @param {*} body
 */
export const parseBodyProperties = (body) => {
  return _parseBodyProperties(body, [
    {
      target: REGEXP_PROPERTIES,
      tags: REGEXP_PROPERTIES_TAGS,
      tagsArea: REGEXP_PROPERTIES_TAGS_AREA,
      annotationsEnd: REGEXP_ANNOTATIONS_END_PROPERTIES,
      signatureStart: REGEXP_SIGNATURE_START_PROPERTIES,
      signatureEnd: REGEXP_SIGNATURE_END_PROPERTIES
    },
    {
      target: REGEXP_PROPERTIES_GET_SET,
      tags: REGEXP_PROPERTIES_TAGS,
      tagsArea: REGEXP_PROPERTIES_TAGS_AREA,
      annotationsEnd: REGEXP_ANNOTATIONS_END_PROPERTIES,
      signatureStart: REGEXP_SIGNATURE_START_PROPERTIES,
      signatureEnd: REGEXP_SIGNATURE_END_PROPERTIES
    }
  ]);
};
