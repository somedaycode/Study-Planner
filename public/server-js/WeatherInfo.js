const fs = require('fs');
const request = require('request');
const moment = require('moment');
require('moment-timezone');

const writefile = (fileData) => {
  fs.writeFile('./public/data/weatherData.json', fileData, 'utf8', (err) => {
    if (err) throw err;
  });
};

const requestWeatherInfo = (grid) => {
  moment.tz.setDefault('Asia/Seoul');
  const date = moment().format('YYYYMMDD');

  const callbackURL =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?';
  const serviceKey =
    'serviceKey=O%2Bj3FsaYtTiaBzr4QTmqGuNS%2Bgflc%2FHdaldkCNDayWirwSI1faD6aPPW6q7EhdQoCsri%2BAbx%2FfUHn2sibtx9Hg%3D%3D';
  const pageNo = 'pageNo=1';
  const numOfRows = 'numOfRows=999';
  const dataType = 'dataType=JSON';
  const base_date = `base_date=${date}`;
  const base_time = `base_time=0500`;
  const nx = `nx=${grid.x}`;
  const ny = `ny=${grid.y}`;
  const URL = `${callbackURL}${serviceKey}&${pageNo}&${numOfRows}&${dataType}&${base_date}&${base_time}&${nx}&${ny}`;

  request(URL, (err, res, body) => {
    const weatherData = body;
    writefile(weatherData);
  });
};

module.exports = requestWeatherInfo;
