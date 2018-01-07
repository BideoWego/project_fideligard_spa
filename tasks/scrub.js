const fs = require('fs');
const raw = require('../src/data/raw');
const { startDate, endDate } = require('../src/data/config');
const moment = require('moment');


// ----------------------------------------
// Variables and functions
// ----------------------------------------
const projections = [
  [25, 'hours'],
  [7, 'days'],
  [30, 'days']
];

const project = date => {
  const [ d1, d2, d30 ] = projections.map(projection => {
    const [ num, interval ] = projection;
    return moment(date).add(num, interval).format().slice(0, 10);
  });

  return { d1, d2, d30 };
};

const getProjectedValues = ({ d1, d7, d30, stocks, ticker }) => {
  return [
    [d1, 1],
    [d7, 7],
    [d30, 30]
  ].reduce((s, [d, n]) => {
    s[`v${ n }`] = stocks[d] ? stocks[d][ticker] : {}
    return s;
  }, {});
};

const calculatedProjected = ({ v1, v7, v30, stocks, date, ticker }) => {
  const current = stocks[date][ticker];

  return [
    [v1, 1],
    [v7, 7],
    [v30, 30]
  ].reduce((s, [v, n]) => {
    s[`d${ n }`] = v.close ? (v.close - current.close).toPrecision(2) : null
    return s;
  }, {});
};



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

  scrubbed.dates = Object.keys(dates).reverse();

  scrubbed.dates.forEach(date => {
    const {
      d1,
      d7,
      d30
    } = project(date);

    Object.keys(scrubbed.stocks.byDate[date]).forEach(ticker => {
      const {
        v1,
        v7,
        v30
      } = getProjectedValues({
        d1,
        d7,
        d30,
        stocks: scrubbed.stocks.byDate,
        ticker
      });

      const projected = calculatedProjected({
        v1,
        v7,
        v30,
        stocks: scrubbed.stocks.byDate,
        date,
        ticker
      });

      Object.assign(scrubbed.stocks.byDate[date][ticker], projected);
      Object.assign(scrubbed.stocks.byTicker[ticker][date], projected);
    });
  });

  console.log('Writing...');
  const data = JSON.stringify(scrubbed, null, 2);
  fs.writeFileSync("./src/data/scrubbed/index.json", data);

  console.log('Done.');
} catch (e) {
  console.error(e);
}
