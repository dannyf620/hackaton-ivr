import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IState, IStateResponse } from '../models/IState';

@Injectable({
  providedIn: 'root'
})
export class IvrService {
  private ivrId: string;

  constructor(private http: HttpClient) { }

  createCall(phoneNumber: string): Observable<IState> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<IStateResponse>('api/ivr-requests', {phone: phoneNumber}, {headers}).pipe(
      map(res => {
        this.ivrId = res.data && res.data.uuid;
        return res.data;
      })
    );
  }

  getNewState(type, data, next): Observable<IState> {
    return this.http.put<IStateResponse>('api/ivr-requests/' + this.ivrId, {
      next,
      data,
      type
    }).pipe(
      map(res => res.data)
    );
  }

  getCredential() {
    return this.ivrId;
  }

  destroyCredential() {
    this.ivrId = undefined;
  }
}

