import { StateCreator } from 'zustand';
import { type GlobalStore } from './global.store';

export type HistoryPoint = {
  id: string;
  url: string;
};
export type NavigationSlice = {
  navigation: {
    history: HistoryPoint[];

    pushHistoryPoint: (historyPoint: HistoryPoint) => void;
    removeHistoryPointById: (id: string) => void;
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

    pushHistoryPoint: (historyPoint: HistoryPoint) => {
      set(({ navigation }) => ({
        navigation: {
          ...navigation,
          history: [...navigation.history, historyPoint].slice(-3),
        },
      }));
    },
    removeHistoryPointById: (id: string) => {
      set(({ navigation }) => ({
        navigation: {
          ...navigation,
          history: navigation.history.filter((point) => point.id !== id),
        },
      }));
    },
  },
});
