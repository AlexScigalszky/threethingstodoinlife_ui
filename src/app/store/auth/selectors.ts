import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { AuthState } from './reducer';

const authState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  authState,
  (state: AuthState) => state.logged
);

export const selectUsername = createSelector(authState, (state: AuthState) => {
  if (state.user?.firstName && state.user?.lastName) {
    return state.user?.firstName + ' ' + state.user?.lastName;
  }
  return null;
});
