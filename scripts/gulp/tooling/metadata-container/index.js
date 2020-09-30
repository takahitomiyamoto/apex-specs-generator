/**
 * @name metadata-container/index.js
 */
import {
  uuidv4,
  postMetadataContainer,
  writeFileSyncUtf8
} from '../../common/lib';

/**
 * @description asyncCreateMetadataContainerId
 * @param {*} params
 */
export async function asyncCreateMetadataContainerId(params) {
  const responseString = await postMetadataContainer({
    accessToken: params.loginJwt.accessToken,
    instanceUrl: params.loginJwt.instanceUrl,
    options: {
      asOfVersion: params.environment.secrets.asOfVersion,
      body: {
        name: uuidv4().substring(0, 32)
      }
    }
  });

  // archive
  writeFileSyncUtf8(
    params.environment.logs.createMetadataContainer,
    responseString
  );
  console.log(params.environment.logs.createMetadataContainer);

  return JSON.parse(responseString).id;
}
