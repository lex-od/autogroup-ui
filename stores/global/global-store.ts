import { createStore } from 'zustand/vanilla';

import { type HelloSlice, createHelloSlice } from './hello-slice';

export type GlobalStore = HelloSlice;

export const createGlobalStore = () => {
  return createStore<GlobalStore>()((...args) => ({
    ...createHelloSlice(...args),
  }));
};
