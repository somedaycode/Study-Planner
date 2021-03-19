import { _, insertTemplate } from './util.js';
/*
 * 맑음	 0 ～ 5
 * 구름많음	 6 ～ 8
 * 흐림	 9 ～ 10
 */
class Weather {
  constructor({ weather }) {
    this.init();
    this.COORD = 'COORD';
    this.weatherInfo;
    this.code = {
      temperature: 'T1H',
      sky: 'SKY',
      precipitation: 'PTY',
      rainfall: 'RN1',
    };
    this.weatherTextWrap = weather.textWrap;
    this.weatherIMGWrap = weather.imgWrap;
  }

  init() {
    this.loadWeatherStatus();
    setTimeout(() => {
      this.fetchData();
    }, 1000);
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
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const coordsObj = {
          latitude,
          longitude,
        };
        this.test = coordsObj;
        resolve(this.test);
      });
    }).then((coord) => {
      this.saveCoords(coord);
      this.sendCoordData(coord);
    });
  }

  sendCoordData(coordsObj) {
    fetch('/data', {
      method: 'post',
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
    try {
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
    } catch {
      (err) => console.log(err);
    }
  }

  async getWeatherInfoList(responseData) {
    const data = await responseData.response.body;
    const weatherData = await data.items.item;
    this.weatherInfo = Array.from(weatherData);
    const weatherStatus = {
      temperature: this.getWeatherForcastValue(this.code.temperature),
      sky: this.getWeatherForcastValue(this.code.sky),
      precipitation: this.getWeatherForcastValue(this.code.precipitation),
      rainfall: this.getWeatherForcastValue(this.code.rainfall),
    };
    this.renderWeatherInfo(weatherStatus);
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

  renderWeatherInfo({ temperature, sky, precipitation, rainfall }) {
    const temperatureStatus = this.temperatureTemplate(temperature);
    const skystatus = this.skyStatusTemplate(sky);
    insertTemplate(this.weatherTextWrap, 'beforeend', temperatureStatus);
    insertTemplate(this.weatherIMGWrap, 'beforeend', skystatus);
    console.log(precipitation);
    console.log(rainfall);
  }

  temperatureTemplate(celcius) {
    return `<span>${celcius}°C</span>`;
  }

  skyStatusTemplate(sky) {
    if (sky < 6) {
      return `
        <div class="weather-sky">
          <img src="/img/001-sun.svg" alt="sunny" />
        </div>`;
    }

    if (5 < sky <= 8) {
      return `
      <div class="weather-sky">
        <img src="/img/002-cloud.svg" alt="cloudy" />
      </div>`;
    }

    if (sky > 8) {
      return `
      <div class="weather-sky">
        <img src="/img/003-cloudy.svg" alt="cloudy" />
      </div>`;
    }
  }
}

export { Weather };
