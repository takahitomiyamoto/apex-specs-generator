/**
 * @name apex/retrieve.js
 */
import { postComposite, writeFileSyncUtf8 } from '../../common/lib';

/**
 * @description asyncRetrieveApex
 * @param {*} params
 */
export async function asyncRetrieveApex(params) {
  const responseString = await params.getApex({
    accessToken: params.loginJwt.accessToken,
    instanceUrl: params.loginJwt.instanceUrl,
    options: {
      asOfVersion: params.environment.secrets.asOfVersion,
      fields: params.fields,
      limit: 50000
    }
  });

  // archive
  writeFileSyncUtf8(params.logFile, responseString);
  console.log(params.logFile);

  return JSON.parse(responseString).records;
}

/**
 * @description asyncRetrieveApexMembers
 * @param {*} params
 */
export async function asyncRetrieveApexMembers(params) {
  const compositeRequest = params.apexMembers.map((record) => {
    return {
      method: 'GET',
      url: record.httpHeaders.Location,
      referenceId: record.referenceId
    };
  });

  const responseString = await postComposite({
    accessToken: params.loginJwt.accessToken,
    instanceUrl: params.loginJwt.instanceUrl,
    options: {
      asOfVersion: params.environment.secrets.asOfVersion,
      body: {
        compositeRequest: compositeRequest
      }
    }
  });
  const compositeResponse = JSON.parse(responseString).compositeResponse;

  const results = await compositeResponse.map((record) => {
    return {
      symbolTable: {
        filename: `${params.folder}/${record.body.FullName}.json`,
        contents: JSON.stringify(record.body.SymbolTable)
      }
    };
  });

  return results;
}
