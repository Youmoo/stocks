const api = require('./api');
describe('xueqiu', () => {
  it('token', async () => {
    const token = await api.fetch_token();
    expect(token).toBeTruthy();
  });

  it('stocks', async () => {
    const token = await api.fetch_token();
    api.fetch_stocks("sz000002", token)
  });


  it('stock list', async () => {
    const token = await api.fetch_token();
    const data = await api.stock_list({token, size: 10000, page: 1});
    expect(data.stocks.length).toBe(100);
  });
});
