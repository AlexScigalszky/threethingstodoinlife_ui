import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DoneInfo } from '../models/done_info';
import { MarkAsDone } from '../types/mark_as_done.type';

@Injectable({
  providedIn: 'root',
})
export class DoneService {
  headers: any;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    };
  }

  getByUser(userIdentifier: string | null): Observable<DoneInfo[]> {
    return this.http.post<DoneInfo[]>(
      'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/done-by-user',
      { userIdentifier },
      {
        headers: this.headers,
      }
    );
  }

  markAsUndone(data: MarkAsDone): Observable<void> {
    // return this.http.post<void>(
    //   'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/favorites-remove',
    //   { identifier, userIdentifier },
    //   {
    //     headers: this.headers,
    //   }
    // );
    return of();
  }
  markAsDone(data: MarkAsDone): Observable<void> {
    return of();
  }
}
