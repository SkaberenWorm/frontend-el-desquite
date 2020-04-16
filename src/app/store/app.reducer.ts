import * as fromAUTH from 'src/app/store/reducers/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {

    auth: fromAUTH.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
        auth : fromAUTH.authReducer
};
