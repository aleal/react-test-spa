import { combineReducers } from 'redux';

import {reducer as FormReducer} from 'redux-form';

import UsersReducer from './users-reducer'

const rootReducer = combineReducers({
  userData: UsersReducer,
  form: FormReducer
});

export default rootReducer;