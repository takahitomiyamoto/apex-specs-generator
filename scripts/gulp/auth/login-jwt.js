/**
 * @name login-jwt.js
 * @description login with JWT bearer flow
 */
import { loginJwt, writeFileSyncUtf8 } from '../common/lib';

/**
 * @name asyncLoginJwt
 */
export async function asyncLoginJwt(environment) {
  // login
  const authentication = {
    privateKey: environment.secrets.privateKey,
    clientId: environment.secrets.clientId,
    username: environment.secrets.username,
    hostname: environment.secrets.hostname
  };
  const result = await loginJwt(authentication);

  // archive
  writeFileSyncUtf8(environment.logs.loginJwt, result);
  console.log(environment.logs.loginJwt);

  return result;
}
