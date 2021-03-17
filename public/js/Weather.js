import { _ } from './util.js';

class Weather {
  constructor(target) {
    this.init();
    this.COORD = 'COORD';
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
    const res = await fetch('data')
      .then((raw) => raw.json())
      .then((res) => res.response.body);
    const weatherData = await res.items.item;
    const test = Array.from(weatherData).filter((v) => v.category === 'POP');
    console.log(test);
  }
}

export { Weather };
