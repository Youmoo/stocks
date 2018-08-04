stocks
=======

从雪球爬取当天股票数据到本地.

历史数据备份(从2018-05-09至今): https://pan.baidu.com/s/1XwPavD-osWqZW9aEjGCz4w 密码: sqpe


```bash
# 安装
git clone https://github.com/Youmoo/stocks.git
cd stocks
npm i

# 测试(node v10.0.0)
npm test

# 运行
npm start
```

爬取的数据默认保存到`~/stock_history`目录下，可根据环境变量`STOCK_DIR`重新配置.

如果需要将数据导入到mongodb中进行分析，执行以下命令(适用于Mac)

```bash
# 安装jq
brew install jq

# 格式化数据并导入到mongodb
cd ~/stock_history
for i in *
  if [ -d $i ];then
  jq --arg date $i '. + {date:$date}' $i/*.json|jq -s -c .\
  |mongoimport --jsonArray --db logically --collection stocks
fi
```
