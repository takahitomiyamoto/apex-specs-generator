/**
 * @name doc/index.js
 */
import json2md from 'json2md';
import { readFileSyncUtf8, writeFileSyncUtf8 } from '../../common/lib';
import { createHeaderArea } from './header';
import { createExternalReferencesArea } from './external-references';
import { createInnerClassesArea } from './inner-classes';
import { createPropertiesArea } from './properties';
import { createConstructorsArea } from './constructors';
import { createMethodsArea } from './methods';

/**
 * @description addRawData
 * @param {*} md
 * @param {*} json
 * @param {*} filename
 */
const addRawData = (md, json, filename) => {
  md.push({ h2: 'Raw Data' });
  const h3List = Object.keys(json);
  for (let h3 of h3List) {
    md.push({ h3: h3 });
    md.push({ p: JSON.stringify(json[h3]) });
  }

  writeFileSyncUtf8(filename, json2md(md));
};

/**
 * @description getJsonApexMember
 * @param {*} config
 * @param {*} apexMember
 */
const getJsonApexMember = (config, apexMember) => {
  const stringApexMember = readFileSyncUtf8(
    `${config.symbolTableFolder}/${apexMember}.json`
  );

  return JSON.parse(stringApexMember);
};

/**
 * @description getJsonApex
 * @param {*} config
 * @param {*} apexMember
 */
const getJsonApex = (config, apexMember) => {
  const stringApex = readFileSyncUtf8(`${config.retrieveLogFile}`);
  const records = JSON.parse(stringApex).records;

  return records.filter((record) => {
    return apexMember === record.Name;
  })[0];
};

/**
 * @description generateMarkdown
 * @param {*} environment
 * @param {*} apexMember
 */
const generateMarkdown = (environment, config, apexMember) => {
  const jsonApex = getJsonApex(config, apexMember);
  const jsonApexMember = getJsonApexMember(config, apexMember);

  const md = [];

  // Title
  md.push({ h1: `${jsonApexMember.name}${config.fileExtension}` });

  // Header
  md.push(createHeaderArea(jsonApex, jsonApexMember));
  md.push({ p: '<br>' });

  // External References
  md.push(createExternalReferencesArea(jsonApexMember.externalReferences));
  md.push({ p: '<br>' });

  if ('ApexClass' === jsonApex.attributes.type) {
    // Inner Classes
    md.push(createInnerClassesArea(jsonApexMember.innerClasses));
    md.push({ p: '<br>' });

    // Properties
    md.push(createPropertiesArea(jsonApexMember.properties));
    md.push({ p: '<br>' });

    // Constructors
    md.push(createConstructorsArea(jsonApexMember.constructors));
    md.push({ p: '<br>' });

    // Methods
    md.push(createMethodsArea(jsonApexMember.methods));
    md.push({ p: '<br>' });
  }

  // archive
  writeFileSyncUtf8(`${config.docsFolder}/${apexMember}.md`, json2md(md));

  // raw data
  const filename = `${config.rawDataFolder}/${apexMember}.raw.md`;
  addRawData(md, jsonApexMember, filename);
};

/**
 * @description generateDocs
 * @param {*} environment
 * @param {*} config
 */
export async function generateDocs(environment, config, apexNames) {
  apexNames.forEach((apexName) => {
    generateMarkdown(environment, config, apexName);
  });
}
