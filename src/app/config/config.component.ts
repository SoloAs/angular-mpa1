import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Config } from '../classes/config';
import { invalid } from '@angular/compiler/src/render3/view/util';

const invalidStyle = { 'background-color': 'red' };
const updatedStyle = { 'background-color': 'yellow' };
const defaultStyle = { 'background-color': '' };
const ipRegex = new RegExp("^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$");

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
  
  
export class ConfigComponent implements OnInit {

  stylesObj = {
    device_name: defaultStyle,
    mode: defaultStyle,
    dhcp: defaultStyle,
    ip: defaultStyle,
    port: defaultStyle,
    dns: defaultStyle,
    stream_delivery: defaultStyle,
    video_resolution: defaultStyle,
    framerate: defaultStyle,
    audio_mode: defaultStyle
  }

  constructor(public configService: ConfigService) { }
  
  ngOnInit() {
    this.configService.requestConfig().subscribe(res => {
      this.configService.setConfig(res);
    })
  }

  validate(event) {
    switch (event.target.id) {
      case 'device_name': {
        if (event.target.value.length > 20) {
          this.stylesObj[event.target.id] = invalidStyle;
        } else {
          this.stylesObj[event.target.id] = updatedStyle;
        }
        break;
      }
      case "ip": {
        if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(event.target.value)) {
          this.stylesObj[event.target.id] = updatedStyle;
        } else {
          this.stylesObj[event.target.id] = invalidStyle;
        }
        break;
      }
      case "port": {
        if (/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(event.target.value)) {
          this.stylesObj[event.target.id] = updatedStyle;
        } else {
          this.stylesObj[event.target.id] = invalidStyle;
        }
      }
        
      
    }

  }

  isPatcheable(): boolean {
    let result: boolean = false;
    for (let property in this.stylesObj) {
      if (this.stylesObj[property] == invalidStyle) {
        return false;
      }
      if (this.stylesObj[property] == updatedStyle) {
        result = true;
      }
    }
    return result;
  }

  cancelUpdates() {
    this.configService.requestConfig().subscribe(res => {
      this.configService.setConfig(res);
    })
    for (let property in this.stylesObj) {
      this.stylesObj[property] = defaultStyle;
    }
  }

  sendPatchRequest() {
    
    let body = {};
    for (let property in this.stylesObj) {
      if (this.stylesObj[property] == updatedStyle) {
        body[property] = "kek"
      }
    }
    this.configService.patchConfig(body).subscribe(() => {
      this.configService.requestConfig().subscribe(res => {
        this.configService.setConfig(res);
      })
    })
    
    for (let property in this.stylesObj) {
      this.stylesObj[property] = defaultStyle;
    }
  }

}
