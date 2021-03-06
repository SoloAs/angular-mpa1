import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {

  public url: string;
  public version: string = "/v1.0";


  constructor() { 
    // Obtain backend URL
    if (isDevMode()) {
      this.url = "http://192.168.59.59:8081";
    } else {
      let ip = window.location.hostname;
      this.url = "http://" + ip + ":" + "8081"
    }
  } 


  /**
   * Default error handler
   * @param error 
   */
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
