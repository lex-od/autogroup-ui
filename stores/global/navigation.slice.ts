import { StateCreator } from 'zustand';
import { type GlobalStore } from './global.store';

export type HistoryPoint = {
  id: string;
  url: string;
};
export type NavigationSlice = {
  navigation: {
    history: HistoryPoint[];

    pushHistoryPoint: (point: HistoryPoint) => void;
    removeHistoryPoint: (id: string) => void;
  };
};

export const createNavigationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  NavigationSlice
> = (set) => ({
  navigation: {
    history: [],

    pushHistoryPoint: (point: HistoryPoint) => {
      set(({ navigation }) => ({
        navigation: {
          ...navigation,
          history: [...navigation.history, point].slice(-3),
        },
      }));
    },
    removeHistoryPoint: (id: string) => {
      set(({ navigation }) => ({
        navigation: {
          ...navigation,
          history: navigation.history.filter((point) => point.id !== id),
        },
      }));
    },
  },
});
