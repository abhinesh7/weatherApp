import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cityName = '';
  apiId = "c51223c219d6aec8cb8c5210449bd859";
  cityDetailData = new Subject();

  constructor(private http: HttpClient) { }

  getCityData(cityName) {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + this.apiId);
  }

  getCityDetailData(city) {
    return this.http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + this.apiId);
  }

}
