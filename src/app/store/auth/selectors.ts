import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducer';

const authState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  authState,
  (state: AuthState) => {
    console.log('sect');
    return state.user !== null;
  }
);

export const selectUsername = createSelector(
  authState,
  (state: AuthState) => state.user?.firstName + ' ' + state.user?.lastName
);
