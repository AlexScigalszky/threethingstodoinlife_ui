import { Component, OnInit } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div id="login-container" class="d-flex justify-content-center">
      <div class="jumbotron bg-transparent text-center d-flex">
        <div *ngIf="!user" class="card text-center align-self-center">
          <h1 class="card-header display-1 text-center p-5">
            The three thing everybody have to do in life
          </h1>
          <div class="card-block p-3">
            <h4 class="card-title">Not signed in</h4>
            <p class="card-text">Sign in with</p>
          </div>
          <div class="card-block d-flex justify-content-center p-3">
            <asl-google-signin-button
              [size]="'large'"
              [text]="'signin_with'"
              [type]="'standard'"
            ></asl-google-signin-button>
          </div>
        </div>

        <div *ngIf="user" class="card text-center align-self-center">
          <h6 class="card-header">Three thing to do in life Login</h6>
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
    </div>
  `,
  styles: ['#login-container { height: 100vh }'],
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
