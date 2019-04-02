import { createStore, combineReducers } from 'redux';

import trainReducers from './reducers/trainReducers';

const rootReducer = combineReducers({
    trains_red :trainReducers
});

const configureStore = ()=>{
    return createStore(rootReducer);
}

export default configureStore;