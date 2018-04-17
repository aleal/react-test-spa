import { combineReducers } from 'redux';

import {reducer as FormReducer} from 'redux-form';

import UsersReducer from './users-reducer';
import DogsReducer from './dogs-reducer';

import {ADD_DOG_SUCCESS} from '../actions';

const rootReducer = combineReducers({
  userData: UsersReducer,
  dogData: DogsReducer,
  form: FormReducer
});

export default rootReducer;