import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  cityDetailData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.setCityDetails();
  }

  setCityDetails() {
    this.weatherService.cityDetailData.subscribe(
      data => {
        console.log("cityDetailData", data);
        this.cityDetailData = data;
      },
      error => {
        this.cityDetailData = null;
        alert('Invalid City Details');
      });
  }

  public getWeatherIconUrl(icon: string, size?: string) {
    const iconUrl = 'http://openweathermap.org/img/wn/';
    if (size) {
      return iconUrl + icon + '@' + size + '.png';
    } else {
      return iconUrl + icon + '.png';
    }
  }


}
