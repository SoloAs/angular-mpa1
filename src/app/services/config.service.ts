import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../classes/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { BackofficeService } from './backoffice.service';

const endpoint: string = '/config'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: Config // = { "general": { "device_name": "Macnica MPA1000", "mode": "Encoder", "nmos": "ST2110" }, "media": { "audio_channels": "Disabled", "framerate": "HDMI EDID", "video_resolution": "HDMI EDID" }, "network": { "dhcp": true, "dns": "8.8.8.8", "ip": "192.16kjhunk8.1.2", "port": "8081", "stream_delivery": "Unicast" } };
  
  constructor(
    private http: HttpClient,
    private backofficeService: BackofficeService
  ) {}

  /**
   * GET /config
   * @returns configuration object
   */
  requestConfig(): Observable<Config> {
    return this.http.get<Config>(this.backofficeService.url + this.backofficeService.version + endpoint)
      .pipe(
        catchError(error => {
          // TODO: display error
          return this.backofficeService.handleError(error);
        })
      );
  }
  

  /**
   * Sets config locally
   * @param config 
   */
  setConfig(config: Config) {
    this.config = config;
  }

  /**
   * PATCH /config
   * @param body PATCH request body
   */
  patchConfig(body): Observable<any> {
    return this.http.patch(this.backofficeService.url + this.backofficeService.version + endpoint, body, httpOptions)
      .pipe(
        catchError(error => {
          // TODO: display error
          return this.backofficeService.handleError(error);
        })
      )
  }
}
