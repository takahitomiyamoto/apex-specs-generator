/**
 * @name gulpfile.babel.js
 * @description gulpfile
 */
import { series } from 'gulp';

// init
import upgradeDependencies from './scripts/gulp/init/upgrade-dependencies';
import cleanCache from './scripts/gulp/init/clean-cache';
import cleanLogs from './scripts/gulp/init/clean-logs';

// tooling
import generateApexSpecs from './scripts/gulp/tooling/apex-specs-generator';

// gulp tasks
exports.generateApexSpecs = series(cleanLogs, generateApexSpecs);
exports.init = series(cleanCache, upgradeDependencies, cleanLogs);
