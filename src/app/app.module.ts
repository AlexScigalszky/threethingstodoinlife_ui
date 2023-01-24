import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { counterReducer } from './counter.reducer';
import { itemReducer } from './store/reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './store/items/effects';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    ItemListComponent,
    ItemComponent,
    MyCounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot([itemReducer]),
    EffectsModule.forRoot([ItemEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
