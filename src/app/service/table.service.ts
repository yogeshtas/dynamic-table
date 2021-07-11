import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get("https://randomuser.me/api/?results=5000")
        .pipe(catchError(this.handleErrorObservable));
  }

  private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return throwError(error);
    }
}
