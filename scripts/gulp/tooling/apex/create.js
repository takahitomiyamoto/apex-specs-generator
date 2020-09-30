/**
 * @name apex/create.js
 */
import { postComposite, writeFileSyncUtf8 } from '../../common/lib';

/**
 * @description asyncCreateApexMembers
 * @param {*} params
 */
export async function asyncCreateApexMembers(params) {
  const compositeRequest = params.apex.map((record) => {
    return {
      method: 'POST',
      url: `/services/data/v${params.environment.secrets.asOfVersion}/tooling/sobjects/${params.apexMember}/`,
      referenceId: record.Id,
      body: {
        Body: record.Body,
        MetadataContainerId: params.metadataContainerId,
        ContentEntityId: record.Id
      }
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

  // archive
  writeFileSyncUtf8(params.logFile, responseString);
  console.log(params.logFile);

  return JSON.parse(responseString).compositeResponse;
}
