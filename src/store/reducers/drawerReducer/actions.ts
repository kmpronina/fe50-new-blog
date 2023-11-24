import { DrawerReducerEnum } from './actionTypes';

export const setDrawerOpen = () => ({
  type: DrawerReducerEnum.SET_DRAWER_OPEN,
});
export const setDrawerClose = () => ({
  type: DrawerReducerEnum.SET_DRAWER_CLOSE,
});
