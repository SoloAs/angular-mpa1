import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

const invalidStyle = { 'background-color': 'red' };
const updatedStyle = { 'background-color': 'yellow' };
const defaultStyle = { 'background-color': '' };

/**
 * Helper function to find attribute in nested
 * configuration json
 * @param json 
 * @param key 
 */
let findValue = function (json, key) {
  for (let element in json) {
    if (!json[element].hasOwnProperty(key)) continue;
    else
      return json[element][key];
  }
};

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
  
  
export class ConfigComponent implements OnInit {
  /**
   * Contains styles of all configuration inputs
   * Binded with the view
   */
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
    audio_channels: defaultStyle
  }

  constructor(public configService: ConfigService) { }
  
  ngOnInit() {
    // Get and display configuration on page load
    this.configService.requestConfig().subscribe(res => {
      this.configService.setConfig(res);
    })
  }
  
  /**
   * Function for validation input values before doing PATCH request. On update highlights
   * valid updates with yellow, invalid updates with red
   * @param event object containing information about changed subject (such as id and value)
   */
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
      case "ip":
      case "dns": {
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
      default: {
        this.stylesObj[event.target.id] = updatedStyle;
      }
        
      
    }

  }

  /**
   * Checks if any of proposed configuration updates are invalid
   * @returns if updated params are valid
   */
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

  /**
   * Removes all updates which aren't sent yet and returns old values
   */
  cancelUpdates() {
    this.configService.requestConfig().subscribe(res => {
      this.configService.setConfig(res);
    })
    for (let property in this.stylesObj) {
      this.stylesObj[property] = defaultStyle;
    }
  }


  /**
   * Forms PATCH request body, executes an actual request and 
   * restores input styles back to default
   */
  sendPatchRequest() {
    let body = {};
    for (let property in this.stylesObj) {
      if (this.stylesObj[property] == updatedStyle) {
        body[property] = findValue(this.configService.config, property);
      }
    }
    this.configService.patchConfig(body).subscribe(() => {
      this.configService.requestConfig().subscribe(res => {
        this.configService.setConfig(res);
        for (let property in this.stylesObj) {
          this.stylesObj[property] = defaultStyle;
        }
      })
    })
  }

}
