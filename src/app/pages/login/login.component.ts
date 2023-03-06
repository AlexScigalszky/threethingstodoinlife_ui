import { Component, OnInit } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Store } from '@ngrx/store';
import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, skip } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <div class="jumbotron bg-transparent text-center">
      <div *ngIf="!user" class="card text-center">
        <h6 class="card-header">Social Login Demo</h6>
        <div class="card-block">
          <h4 class="card-title">Not signed in</h4>
          <p class="card-text">Sign in with</p>
        </div>
        <div class="card-block d-flex justify-content-center">
          <asl-google-signin-button class="mx-5"></asl-google-signin-button>
        </div>
      </div>

      <div *ngIf="user" class="card text-center">
        <h6 class="card-header">Social Login Demo</h6>
        <div class="card-block"></div>
        <img
          *ngIf="user.photoUrl"
          width="200px"
          height="200px"
          class="card-img-top img-responsive photo"
          src="{{ user.photoUrl }}"
        />
        <div class="card-block">
          <h4 class="card-title">{{ user.name }}</h4>
          <p class="card-text">{{ user.email }}</p>
          <p class="card-text">Logged in with {{ user.provider }}</p>
        </div>
        <!-- <div
          class="card-block"
          *ngIf="user.provider === GoogleLoginProvider.PROVIDER_ID"
        >
          <button class="btn" (click)="refreshGoogleToken()">
            Refresh google token
          </button>
        </div> -->
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  user: SocialUser | undefined;
  // GoogleLoginProvider = GoogleLoginProvider;

  constructor(private store: Store, private router: Router) {}

  // refreshGoogleToken(): void {
  //   this.store.dispatch(Actions.refreshAuthToken());
  // }

  ngOnInit(): void {}
}
