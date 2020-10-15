/**
 * @name doc/index.js
 */
import json2md from 'json2md';
import { readFileSyncUtf8, writeFileSyncUtf8 } from '../../common/lib';
import {
  NOT_APPLICABLE,
  TITLE_EXTERNAL_REFERENCES,
  TITLE_INNER_CLASSES,
  TITLE_PROPERTIES,
  TITLE_CONSTRUCTORS,
  TITLE_METHODS
} from './config';
import { createHeaderArea, parseBodyHeader } from './header';
import { createExternalReferences } from './external-references';
import { createInnerClasses, parseBodyInnerClasses } from './inner-classes';
import { createProperties, parseBodyProperties } from './properties';
import { parseBodyConstructors, createConstructors } from './constructors';
import { parseBodyMethods, createMethods } from './methods';

/**
 * @description _addRawData
 * @param {*} md
 * @param {*} json
 * @param {*} filename
 */
const _addRawData = (md, json, filename) => {
  md.push({ h2: 'Raw Data' });
  const h3List = Object.keys(json);
  for (let h3 of h3List) {
    md.push({ h3: h3 });
    md.push({ p: JSON.stringify(json[h3]) });
  }

  writeFileSyncUtf8(filename, json2md(md));
};

/**
 * @description _getJsonApexMember
 * @param {*} config
 * @param {*} apexMember
 */
const _getJsonApexMember = (config, apexMember) => {
  const stringApexMember = readFileSyncUtf8(
    `${config.symbolTableFolder}/${apexMember}.json`
  );

  return JSON.parse(stringApexMember);
};

/**
 * @description _getJsonApex
 * @param {*} config
 * @param {*} apexMember
 */
const _getJsonApex = (config, apexMember) => {
  const stringApex = readFileSyncUtf8(`${config.retrieveLogFile}`);
  const records = JSON.parse(stringApex).records;

  return records.filter((record) => {
    return apexMember === record.Name;
  })[0];
};

/**
 * @description _createArea
 * @param {*} config
 * @param {*} params
 */
const _createArea = (config, params) => {
  const result = [];
  result.push({ h2: config.title });

  if (!params.items.length) {
    result.push({ p: NOT_APPLICABLE });
  } else {
    result.push(config.create(params));
  }

  return result;
};

/**
 * @description generateMarkdownSpecs
 * @param {*} config
 * @param {*} apexMember
 */
const generateMarkdownSpecs = (config, apexMember) => {
  const jsonApex = _getJsonApex(config, apexMember);
  const jsonApexMember = _getJsonApexMember(config, apexMember);

  // TODO: 表示内容をON／OFFできるようにする

  // Title
  const title = `${jsonApexMember.name}${config.fileExtension}`;
  console.log(`\n---`);
  console.log(`\n# ${title}`);

  const md = [];
  md.push({ h1: title });

  const bodyHeader = parseBodyHeader(jsonApex.Body, jsonApex.attributes.type);
  const bodyInnerClass = parseBodyInnerClasses(jsonApex.Body);
  const bodyProperties = parseBodyProperties(jsonApex.Body);
  const bodyConstructors = parseBodyConstructors(jsonApex.Body);
  const bodyMethods = parseBodyMethods(jsonApex.Body);

  // Header
  md.push(
    createHeaderArea({
      apex: jsonApex,
      apexMember: jsonApexMember,
      body: bodyHeader
    })
  );
  md.push({ p: '<br>' });

  // External References
  md.push(
    _createArea(
      {
        title: TITLE_EXTERNAL_REFERENCES,
        create: createExternalReferences
      },
      {
        items: jsonApexMember.externalReferences
      }
    )
  );
  md.push({ p: '<br>' });

  if ('ApexClass' === jsonApex.attributes.type) {
    // Inner Classes
    md.push(
      _createArea(
        {
          title: TITLE_INNER_CLASSES,
          create: createInnerClasses
        },
        {
          items: jsonApexMember.innerClasses,
          body: bodyInnerClass
        }
      )
    );
    md.push({ p: '<br>' });

    // Properties
    md.push(
      _createArea(
        {
          title: TITLE_PROPERTIES,
          create: createProperties
        },
        {
          items: jsonApexMember.properties,
          body: bodyProperties
        }
      )
    );
    md.push({ p: '<br>' });

    // Constructors
    md.push(
      _createArea(
        {
          title: TITLE_CONSTRUCTORS,
          create: createConstructors
        },
        {
          items: jsonApexMember.constructors,
          body: bodyConstructors
        }
      )
    );
    md.push({ p: '<br>' });

    // Methods
    md.push(
      _createArea(
        {
          title: TITLE_METHODS,
          create: createMethods
        },
        {
          items: jsonApexMember.methods,
          body: bodyMethods
        }
      )
    );
    md.push({ p: '<br>' });
  }

  // archive
  writeFileSyncUtf8(`${config.docsFolder}/${apexMember}.md`, json2md(md));

  // raw data
  const filename = `${config.rawDataFolder}/${apexMember}.raw.md`;
  _addRawData(md, jsonApexMember, filename);
};

/**
 * @description generateDocs
 * @param {*} config
 * @param {*} apexNames
 */
export async function generateDocs(config, apexNames) {
  apexNames.forEach((apexName) => {
    generateMarkdownSpecs(config, apexName);
  });

  // TODO: BodyCrc と LengthWithoutComments を一覧化してチェックできるようにする
  // apexNames.forEach((apexName) => {
  //   generateMarkdownList(config, apexName);
  // });
}
