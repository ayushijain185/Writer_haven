import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { userReducer } from './reducer/UserReducer';
import { alertReducer } from './reducer/AlertReducer';
import { postReducer } from './reducer/PostReducer';
  
const rootReducer = combineReducers({
    userReducer: userReducer,
    alertReducer: alertReducer,
    postReducer: postReducer
});
  
  export const store = configureStore({
      reducer: rootReducer, // This is where the root reducer goes
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
      devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
  });
  


// export const store =configureStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
