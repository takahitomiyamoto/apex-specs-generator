/**
 * @name lib.js
 * @description libraries
 */
import gulp from 'gulp';
import shell from 'gulp-shell';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  loginJwt,
  query,
  readFileSyncUtf8,
  writeFileSyncUtf8
} from 'heat-sfdx-common';
import {
  postComposite,
  postContainerAsyncRequest,
  getContainerAsyncRequest,
  getApexClasses,
  getApexTriggers,
  getMetadataContainerList,
  postMetadataContainer,
  postApexClassMember
} from 'heat-sfdx-tooling';

/**
 * @description execute
 * @param {*} command
 */
export const execute = (command) => {
  return gulp.src('.').pipe(
    shell(command, {
      verbose: true,
      ignoreErrors: false
    })
  );
};

export {
  path,
  uuidv4,
  loginJwt,
  query,
  readFileSyncUtf8,
  writeFileSyncUtf8,
  // heat-sfdx-tooling
  postComposite,
  postContainerAsyncRequest,
  getContainerAsyncRequest,
  getApexClasses,
  getApexTriggers,
  getMetadataContainerList,
  postMetadataContainer,
  postApexClassMember
};
