const request = require('request');

const USER_AGENT = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36`;
const TOKEN_REG = /.+?=(.+?);/;

function fetch_token() {
  return new Promise((resolve, reject) => {

    request("https://xueqiu.com/service/csrf?api=/user/login", {
      encoding: null,
      headers: {
        'User-Agent': USER_AGENT
      }
    }, (err, res, data) => {
      if (err) {
        return reject(err);
      }
      const header = res.headers['set-cookie'].find(v => v.startsWith("xq_a_token="));
      resolve(TOKEN_REG.exec(header)[1]);
    });
  })
}

function fetch_stocks(codes, token) {

  request('https://xueqiu.com/v4/stock/quote.json', {
    qs: {
      code: codes,
    },
    headers: {
      'User-Agent': USER_AGENT,
      Cookie: `xq_a_token=${token}`
    }
  }).pipe(process.stdout);
}

function stock_list({
                      token,
                      page = 1,
                      size = 100,
                      order = 'desc',
                      orderby = 'percent',
                      type = [11, 12],
                      _ = Date.now()
                    }) {
  return new Promise((resolve, reject) => {
    request('https://xueqiu.com/stock/cata/stocklist.json', {
      qs: {
        page,
        size,
        order,
        orderby,
        type: type.join(),
        _
      },
      headers: {
        'User-Agent': USER_AGENT,
        Cookie: `xq_a_token=${token}`
      },
      json: true,
    }, (err, res, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    })
  });
}

module.exports = {
  fetch_token,
  fetch_stocks,
  stock_list
};
