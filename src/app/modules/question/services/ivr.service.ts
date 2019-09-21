import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IState, IStateResponse } from '../models/IState';

@Injectable({
  providedIn: 'root'
})
export class IvrService {
  private ivrId: string;

  constructor(private http: HttpClient) { }

  createCall(): Observable<IState> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<IStateResponse>('api/ivr-requests', {}, {headers}).pipe(
      map(res => {
        this.ivrId = res.data && res.data.uuid;
        return res.data;
      })
    );
  }

  getNewState(type, data, next): Observable<IState> {
    return this.http.post<IState>('api/ivr-requests/' + this.ivrId, {
      next,
      data,
      type
    }).pipe(
      tap(res => this.ivrId = res.uuid)
    );
  }

  getCredential() {
    return this.ivrId;
  }

  destroyCredential() {
    this.ivrId = undefined;
  }
}

