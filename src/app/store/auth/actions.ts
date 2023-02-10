import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const login = createAction('[Auth] Login', props<User>());
