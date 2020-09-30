/* eslint-disable no-await-in-loop */
/**
 * @name apex/index.js
 */
import { asyncLoginJwt } from '../../auth/login-jwt';
import { writeFileSyncUtf8 } from '../../common/lib';
import { sleep } from '../../common/utils';
import {
  asyncCreateContainerAsyncRequestId,
  asyncRetrieveContainerAsyncRequestState
} from '../container-async-request';
import { asyncCreateMetadataContainerId } from '../metadata-container';
import { setConfig } from '../docs/config';
import { asyncCreateApexMembers } from './create';
import { generateDocs } from '../docs';
import { asyncRetrieveApex, asyncRetrieveApexMembers } from './retrieve';
import { readFileSyncUtf8 } from '../../common/lib';

const COMPOSITE_OPERATIONS_LIMIT = 25;

/**
 * @description batch
 * @param {*} params
 */
async function batch(params) {
  // create ApexClassMembers / ApexTriggerMembers
  const apexMembers = await asyncCreateApexMembers({
    environment: params.environment,
    loginJwt: params.loginJwt,
    logFile: params.config.createLogFile,
    apex: params.apex,
    apexMember: params.config.apexMember,
    metadataContainerId: params.metadataContainerId
  });

  // create ContainerAsyncRequest
  const containerAsyncRequestId = await asyncCreateContainerAsyncRequestId({
    environment: params.environment,
    loginJwt: params.loginJwt,
    metadataContainerId: params.metadataContainerId
  });

  // retrieve ContainerAsyncRequest - State
  let containerAsyncRequestState;
  while ('Completed' !== containerAsyncRequestState) {
    containerAsyncRequestState = await asyncRetrieveContainerAsyncRequestState({
      environment: params.environment,
      loginJwt: params.loginJwt,
      containerAsyncRequestId: containerAsyncRequestId
    });

    await sleep(3);
  }

  // retrieve ApexClassMembers / ApexTriggerMembers
  const results = await asyncRetrieveApexMembers({
    environment: params.environment,
    loginJwt: params.loginJwt,
    containerAsyncRequestId: containerAsyncRequestId,
    apexMembers: apexMembers,
    folder: params.config.symbolTableFolder
  });

  // archive
  results.forEach((result) => {
    writeFileSyncUtf8(result.symbolTable.filename, result.symbolTable.contents);
    console.log(result.symbolTable.filename);
  });

  // generate .md from .json
  const apexNames = params.apex.map((a) => {
    return a.Name;
  });
  await generateDocs(params.environment, params.config, apexNames);
}

/**
 * @description generate Apex Specifications
 */
async function generateApexSpecs(environment, apexType) {
  const config = setConfig(environment, apexType);

  // login
  const loginJwtString = await asyncLoginJwt(environment);
  const loginJwt = JSON.parse(loginJwtString);

  // create MetadataContainerId
  const metadataContainerId = await asyncCreateMetadataContainerId({
    environment: environment,
    loginJwt: loginJwt
  });

  // retrieve ApexClasses / ApexTriggers
  const apexRecords = await asyncRetrieveApex({
    environment: environment,
    loginJwt: loginJwt,
    logFile: config.retrieveLogFile,
    getApex: config.getApex,
    fields: config.fields
  });

  // The request can’t contain more than 25 operations.
  const size = JSON.parse(readFileSyncUtf8(config.retrieveLogFile)).size;
  const scope = COMPOSITE_OPERATIONS_LIMIT;
  let start = 0;
  while (start < Math.ceil(size / scope)) {
    const apex = apexRecords.slice(start, start + scope - 1);

    /**
     * create ApexClassMembers / ApexTriggerMembers
     * create ContainerAsyncRequest
     * retrieve ContainerAsyncRequest - State
     * retrieve ApexClassMembers / ApexTriggerMembers
     * archive
     * generate .md from .json
     */
    await batch({
      environment: environment,
      loginJwt: loginJwt,
      config: config,
      apex: apex,
      metadataContainerId: metadataContainerId
    });

    start += scope;
  }
}

export {
  asyncCreateApexMembers,
  asyncRetrieveApex,
  asyncRetrieveApexMembers,
  generateApexSpecs
};
