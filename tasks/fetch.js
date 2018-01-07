const fs = require('fs');
const pLimit = require('p-limit');
const limit = pLimit(1);
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config();


// ----------------------------------------
// Variables and functions
// ----------------------------------------
const { tickers, startDate, endDate } = require('../src/data/config');
const baseUrl = 'https://www.quandl.com/api/v3/datasets/EOD/';

const apiUrlFor = ticker => {
  return [
    baseUrl,
    ticker.toUpperCase(),
    '.json',
    '?api_key=',
    process.env.QUANDL_API_KEY,
    `&start_date=${ startDate }&end_date=${ endDate }`
  ].join('');
};


// ----------------------------------------
// Fetch and write data
// ----------------------------------------
try {
  console.log('Fetching stocks data...')

  let promises = tickers.map(async ticker => {
    console.log(`Requesting data for: ${ ticker.toUpperCase() }`);
    const response = await fetch(apiUrlFor(ticker));
    let data = await response.json();
    console.log(`Writing data for: ${ ticker }`);
    data = JSON.stringify(data, null, 2);
    fs.writeFileSync(`./src/data/raw/${ ticker }.json`, data);
    console.log('Success!');
  });

  promises = promises.map(p => limit(() => p));

  (async () => {
    await Promise.all(promises);
    console.log('Done.');
  })();

} catch (e) {
  console.error(e);
}

