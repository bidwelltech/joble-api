const path = require('path');
const app = require(path.resolve(__dirname, '../server'))

const psql = app.datasources.apiDb;
const defaultModels = [
  'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
];
const appModelKeys = Object.keys(app.models)
  .filter(key => !defaultModels.includes(key))
  .map(key => key.toLowerCase())
  // ref: http://stackoverflow.com/a/14438954
  .filter((v, i, a) => a.indexOf(v) === i);
//console.log(psql.settings);

appModelKeys.forEach((key) => {
  psql.automigrate(key);
  console.log(`Migrated ${key}.`);
});
