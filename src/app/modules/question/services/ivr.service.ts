import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Istate } from '../models/Istate';

@Injectable({
  providedIn: 'root'
})
export class IvrService {
  private ivrId: string;

  constructor(private http: HttpClient) { }

  createCall(): Observable<Istate> {
    return this.http.post<Istate>('http://bbf02d17.ngrok.io/api/ivr-requests', {}).pipe(
      tap(res => this.ivrId = res.uuid)
    );
  }

  getNewState(type, data, next): Observable<Istate> {
    return this.http.post<Istate>('http://bbf02d17.ngrok.io/api/ivr-requests/' + this.ivrId, {
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

