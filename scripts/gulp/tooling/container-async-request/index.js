/**
 * @name container-async-request/index.js
 */
import {
  getContainerAsyncRequest,
  postContainerAsyncRequest,
  writeFileSyncUtf8
} from '../../common/lib';

/**
 * @description asyncCreateContainerAsyncRequestId
 * @param {*} params
 */
export async function asyncCreateContainerAsyncRequestId(params) {
  const responseString = await postContainerAsyncRequest({
    accessToken: params.loginJwt.accessToken,
    instanceUrl: params.loginJwt.instanceUrl,
    options: {
      asOfVersion: params.environment.secrets.asOfVersion,
      body: {
        MetadataContainerId: params.metadataContainerId,
        IsCheckOnly: true
      }
    }
  });

  // archive
  writeFileSyncUtf8(
    params.environment.logs.createContainerAsyncRequest,
    responseString
  );
  console.log(params.environment.logs.createContainerAsyncRequest);

  return JSON.parse(responseString).id;
}

/**
 * @description asyncRetrieveContainerAsyncRequestState
 * @param {*} params
 */
export async function asyncRetrieveContainerAsyncRequestState(params) {
  const responseString = await getContainerAsyncRequest({
    accessToken: params.loginJwt.accessToken,
    instanceUrl: params.loginJwt.instanceUrl,
    options: {
      asOfVersion: params.environment.secrets.asOfVersion,
      id: params.containerAsyncRequestId,
      fields: ['Id', 'State', 'MetadataContainerId']
    }
  });

  // archive
  writeFileSyncUtf8(
    params.environment.logs.retrieveContainerAsyncRequests,
    responseString
  );
  console.log(params.environment.logs.retrieveContainerAsyncRequests);

  return JSON.parse(responseString).records[0].State;
}
