const fs = require('fs');
const path = require('path');
const app = require('../server');

const psql = app.datasources.apiDb;

const modelConfigContent = fs.readFileSync(path.resolve(__dirname, '../model-config.json'));
const modelConfig = JSON.parse(modelConfigContent);

Object.keys(modelConfig)
  .filter(key => (
    // Must be a model (models have a dataSource key)
    {}.hasOwnProperty.call(modelConfig[key], 'dataSource')
      // Must be a non-memory model
      && modelConfig[key].dataSource !== 'db'
  ))
  .forEach((key) => {
    psql.automigrate(key);
    console.log(`Migrated ${key} on ${psql.settings.database}.`);
  });
