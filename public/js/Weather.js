import { _ } from './util.js';
/*
 * 맑음	 0 ～ 5
 * 구름많음	 6 ～ 8
 * 흐림	 9 ～ 10
 */
class Weather {
  constructor(target) {
    this.init();
    this.COORD = 'COORD';
    this.weatherInfo;
    this.code = {
      temperature: 'T1H',
      sky: 'SKY',
    };
  }

  init() {
    this.loadWeatherStatus();
    this.fetchData();
  }

  loadWeatherStatus() {
    const currentLocation = sessionStorage.getItem(this.COORD);
    if (currentLocation === null) {
      this.getGeolocation();
    } else {
      const parsedCoord = JSON.parse(currentLocation);
      this.sendCoordData(parsedCoord);
    }
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      const coordsObj = {
        latitude,
        longitude,
      };
      this.test = coordsObj;
      this.saveCoords(coordsObj);
      this.sendCoordData(coordsObj);
    });
  }

  async sendCoordData(coordsObj) {
    await fetch('/', {
      method: 'put',
      body: JSON.stringify(coordsObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  saveCoords(coordinates) {
    sessionStorage.setItem(this.COORD, JSON.stringify(coordinates));
  }

  async fetchData() {
    const cacheName = 'weatherCache';
    const cacheStorage = await caches.open(cacheName);
    const cachedData = await cacheStorage.match('weatherData');
    if (cachedData) {
      const data = await cachedData.json();
      this.getWeatherInfoList(data);
    } else {
      const data = await fetch('/data').then((res) => {
        let resClone = res.clone();
        cacheStorage.put(cacheName, resClone);
        return res.json();
      });
      this.getWeatherInfoList(data);
    }
  }

  async getWeatherInfoList(responseData) {
    const data = await responseData.response.body;
    const weatherData = await data.items.item;
    this.weatherInfo = Array.from(weatherData);
    const currentTemp = this.getWeatherForcastValue(this.code.temperature);
    const currentSky = this.getWeatherForcastValue(this.code.sky);
    console.log(currentTemp, currentSky);
  }

  getWeatherForcastValue(code) {
    const weatherForcastValue = this.weatherInfo
      .filter((weather) => weather.category === code) //
      .reduce((prev, curr) => {
        return this.getCloseTimeFromNow(prev, curr);
      }).fcstValue;
    return weatherForcastValue;
  }

  getCloseTimeFromNow(prev, curr) {
    if (prev.fcstTime === '0000') {
      prev.fcstTime = '2400';
    }
    return prev.fcstTime > curr.fcstTime ? curr : prev;
  }
}

// 온도, 날씨상태 구했다.
// 네이버 api로 주소가져오자
// 혹은 카카오 지도
// 하....
export { Weather };
