const express = require('express');
const router = express.Router();
const coordConverter = require('../public/server-js/coordConverter');
const requestWeatherInfo = require('../public/server-js/WeatherInfo');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.html');
});

router.put('/', function (req, res, next) {
  const { latitude, longitude } = req.body;
  const coord = coordConverter('toXY', latitude, longitude);
  requestWeatherInfo(coord);
});

module.exports = router;
