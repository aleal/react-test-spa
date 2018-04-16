import { createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';

const REDUX_STATE_KEY = 'reduxState';
function buildStore () {
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    // redux state
    const persistedState = (
        localStorage.getItem(REDUX_STATE_KEY) 
        ? JSON.parse(localStorage.getItem(REDUX_STATE_KEY)) 
        : {} 
    );
    const store = createStoreWithMiddleware(reducers, persistedState);
    //save each state change
    store.subscribe(()=>{
        localStorage.setItem(REDUX_STATE_KEY, JSON.stringify(store.getState()));
    });
    return store;
}

export const store = buildStore();


