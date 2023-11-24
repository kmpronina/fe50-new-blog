import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import blogTMSReducer from './reducers/blogTMSReducer';
import drawerReducer from './reducers/drawerReducer';
import userReducer from './reducers/userReducer';

const appReducer = combineReducers({
  drawerReducer,
  userReducer,
  blogTMSReducer,
});

export const store = configureStore({
  reducer: appReducer,

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
});

export type AppStateType = ReturnType<typeof appReducer>;
export type AppDispatchType = ThunkDispatch<AppStateType, null, AnyAction>;

export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
