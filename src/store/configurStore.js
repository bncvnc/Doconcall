import { createStore, combineReducers, compose ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducers from './reducers/auth';
import uiReducers from './reducers/ui';
const rootReducer = combineReducers({
    user:authReducers,
    ui:uiReducers,

});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};


export default configureStore;