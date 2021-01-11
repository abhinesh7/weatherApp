import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  cityName = "";
  cities = [];
  errorMessage = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.cityName = this.cityName;
  }

  addCity(cityName) {
    this.cityName = cityName;
    this.weatherService.getCityData(cityName).subscribe(data => {
      let desc = data['weather'][0].description;
      let temp = data['main'].temp - 273.15;
      this.addCityTolist(temp, desc);
      this.errorMessage = '';
      this.cityName = '';
    },
      error => {
        this.errorMessage = 'Invalid City Name. Please enter a valid city name.'
      });
  }

  addCityTolist(temp, desc) {
    if (this.cities.length < 8) {
      this.cities.unshift({
        city: this.cityName,
        temp: temp,
        desc: desc
      });
      this.refreshCityData(this.cityName);
    }
    else {
      this.cities.unshift({
        city: this.cityName,
        temp: temp,
        desc: desc
      });
      this.cities.pop();
      this.refreshCityData(this.cityName);
    }
  }

  deleteCity(i) {
    this.cities.splice(i, 1);
  }

  refreshCityData(city) {
    this.weatherService.getCityDetailData(city).subscribe(data => {
      console.log(data);
      this.weatherService.cityDetailData.next(data);
    },
      error => {
        alert('Invalid');
      });
  }

  clear() {
    this.cities = [];
    this.weatherService.cityDetailData.next(null);
  }

}
