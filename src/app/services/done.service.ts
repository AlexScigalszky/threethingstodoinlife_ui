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
        'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/done-by-user',
        { userIdentifier },
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap(console.log),
        map((items) =>
          items.map((i: DoneInfo) => ({
            ...i,
            doneFirst: this.toNullableBoolean(i.doneFirst),
            doneSecond: this.toNullableBoolean(i.doneSecond),
            doneThird: this.toNullableBoolean(i.doneThird),
          }))
        )
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

  toNullableBoolean(value: string | boolean): boolean | null {
    const result = value === '0' ? false : value === '1' ? true : null;
    console.log({ value, result });
    return result;
  }
}
