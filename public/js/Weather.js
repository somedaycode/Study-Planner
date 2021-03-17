import { _ } from './util.js';

class Weather {
  constructor(target) {
    this.init();
    this.COORD = 'COORD';
  }

  init() {
    this.loadWeatherStatus();
  }

  loadWeatherStatus() {
    const currentLocation = sessionStorage.getItem(this.COORD);
    if (currentLocation === null) {
      this.getGeolocation();
    } else {
      const parsedCoord = JSON.parse(currentLocation);
      this.getWeatherAPI(parsedCoord);
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
      this.saveCoords(coordsObj);
      this.getWeatherAPI(coordsObj);
    });
  }

  getWeatherAPI = ({ latitude, longitude }) => {
    const serviceKey =
      'O%2Bj3FsaYtTiaBzr4QTmqGuNS%2Bgflc%2FHdaldkCNDayWirwSI1faD6aPPW6q7EhdQoCsri%2BAbx%2FfUHn2sibtx9Hg%3D%3D';
    const constpageNo = '1';
    const constnumOfRows = '10';
    const constdataType = 'JSON';
    const base_date = '20210301';
    const base_time = '20151201';
    const nx = latitude;
    const ny = longitude;
  };

  saveCoords(coordinates) {
    sessionStorage.setItem(this.COORD, JSON.stringify(coordinates));
  }
}

export { Weather };
