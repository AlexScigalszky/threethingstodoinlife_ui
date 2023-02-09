import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    };
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(
      'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/threethings'
    );
  }

  vote(identifier: string): Observable<void> {
    return this.http.post<void>(
      'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/favorites-add',
      { identifier },{
        headers: this.headers
      }
    );
  }
  
  unvote(identifier: string): Observable<void> {
    return this.http.post<void>(
      'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/favorites-remove',
      { identifier },{
        headers: this.headers
      }
    );
  }
}
