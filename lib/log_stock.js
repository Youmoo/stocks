const api = require('./api');
const {format} = require('date-fns');
const path = require('path');
const {mkdir, writeFile} = require('./fs');
const dir = require('os').homedir() + '/stock_history/';

async function main(dest = dir) {
  const token = await api.fetch_token();
  const date = format(new Date(), "YYYY-MM-DD");
  const dir_to_use = path.resolve(dest, date);
  try {
    await mkdir(dir_to_use);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e
    }
  }
  let page = 1;
  while (true) {
    const {stocks} = await api.stock_list({token, page: page});
    page += 1;
    write(stocks, dir_to_use, date);
    if (!stocks.length) {
      break;
    }
  }
}

function write(stocks, dir, date) {
  stocks.forEach(s => {
    const filename = `${s.symbol}_${date}.json`;
    writeFile(path.resolve(dir, filename), JSON.stringify(s), 'utf-8');
  });
}

module.exports = main;
