const fs = require('fs');
const request = require('request');
const moment = require('moment');
require('moment-timezone');

const writefile = (fileData) => {
  fs.writeFile('./public/data/weatherData.json', fileData, 'utf8', (err) => {
    if (err) throw err;
  });
};

const getBaseTime = (hour) => {
  //- Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
  //- API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
  if (hour === '00') hour = 24;
  else hour = Number(hour);
  const baseTime = String(hour - ((hour + 1) % 3));
  if (baseTime.length === 1) baseTime + '0';
  return baseTime + '00';
};

const requestWeatherInfo = (grid) => {
  moment.tz.setDefault('Asia/Seoul');
  const date = moment().format('YYYYMMDD');
  const time = moment().format('HH');
  const baseTime = getBaseTime(time);

  const callbackURL =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?';
  const serviceKey =
    'serviceKey=O%2Bj3FsaYtTiaBzr4QTmqGuNS%2Bgflc%2FHdaldkCNDayWirwSI1faD6aPPW6q7EhdQoCsri%2BAbx%2FfUHn2sibtx9Hg%3D%3D';
  const pageNo = 'pageNo=1';
  const numOfRows = 'numOfRows=999';
  const dataType = 'dataType=JSON';
  const base_date = `base_date=${date}`;
  const base_time = `base_time=${baseTime}`;
  const nx = `nx=${grid.x}`;
  const ny = `ny=${grid.y}`;
  const URL = `${callbackURL}${serviceKey}&${pageNo}&${numOfRows}&${dataType}&${base_date}&${base_time}&${nx}&${ny}`;

  request(URL, (err, res, body) => {
    const weatherData = body;
    writefile(weatherData);
  });
};

module.exports = requestWeatherInfo;
