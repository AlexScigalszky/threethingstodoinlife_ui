import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { DoneInfo } from '../models/done_info';
import { MarkAsDone } from '../types/mark_as_done.type';

@Injectable({
  providedIn: 'root',
})
export class DoneService {
  headers: any;
  baseUrl =
    'https://threethingstodoinlife-functions.netlify.app/.netlify/functions';

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
    return this.http
      .post<DoneInfo[]>(
        this.baseUrl + '/done-by-user',
        { userIdentifier },
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((items) =>
          items.map(
            (i: DoneInfo) =>
              ({
                ...i,
                doneFirst: this.toNullableBoolean(i.doneFirst),
                doneSecond: this.toNullableBoolean(i.doneSecond),
                doneThird: this.toNullableBoolean(i.doneThird),
              } as DoneInfo)
          )
        )
      );
  }

  markAsTodo(data: MarkAsDone): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/done-mark-as-todo', data, {
      headers: this.headers,
    });
  }

  markAsDone(data: MarkAsDone): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/done-mark-as-done', data, {
      headers: this.headers,
    });
  }

  clear(data: MarkAsDone): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/done-clear', data, {
      headers: this.headers,
    });
  }

  private toNullableBoolean(value: string | boolean): boolean | null {
    return value === '' ? null : value === true ? true : false;
  }
}
