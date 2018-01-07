const fs = require('fs');
const raw = require('../data/raw');
const { startDate, endDate } = require('../data/config');


// ----------------------------------------
// Initial data and format
// ----------------------------------------
const scrubbed = {
  startDate,
  endDate,
  tickers: {},
  stocks: {
    byDate: {},
    byTicker: {}
  },
  dates: []
};


// ----------------------------------------
// Scrub the raw data
// ----------------------------------------
try {
  console.log('Scrubbing the raw data...');
  const dates = {};

  Object.keys(raw).forEach(key => {
    console.log(`Scrubbing data for: ${ key }`);

    const ticker = raw[key].dataset;

    scrubbed.tickers[key] = {
      name: ticker.name.replace(' Stock Prices, Dividends and Splits', ''),
      ticker: ticker.dataset_code
    };

    scrubbed.stocks.byTicker[key] = {};

    ticker.data.forEach(day => {
      const [
        date,
        open,
        high,
        low,
        close
      ] = day;

      const stock = {
        date,
        open,
        high,
        low,
        close
      };

      dates[date] = true;

      scrubbed.stocks.byDate[date] = scrubbed.stocks.byDate[date] || {};
      scrubbed.stocks.byDate[date][key] = stock;
      scrubbed.stocks.byTicker[key][date] = stock;
    });
  });

  scrubbed.dates = Object.keys(dates);

  console.log('Writing...');
  const data = JSON.stringify(scrubbed, null, 2);
  fs.writeFileSync("./data/scrubbed/index.json", data);

  console.log('Done.');
} catch (e) {
  console.error(e);
}
