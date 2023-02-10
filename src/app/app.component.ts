import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Selectors from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
 
  userName$ = this.store.select(Selectors.selectUsername)
  constructor(private store: Store){

  }
}
