import { StateCreator } from 'zustand';
import { type GlobalStore } from './global-store';

export type HelloSlice = {
  hello: {
    someNumber: number;

    incSomeNumber: () => void;
  };
};

export const createHelloSlice: StateCreator<GlobalStore, [], [], HelloSlice> = (
  set,
): HelloSlice => ({
  hello: {
    someNumber: 0,

    incSomeNumber: () => {
      set((state) => ({
        hello: {
          ...state.hello,
          someNumber: state.hello.someNumber + 1,
        },
      }));
    },
  },
});
