import { createStore } from 'zustand/vanilla';

import { type AuthSlice, createAuthSlice } from './auth-slice';
import { type HelloSlice, createHelloSlice } from './hello-slice';

export type GlobalStore = AuthSlice & HelloSlice;

export const createGlobalStore = () => {
  return createStore<GlobalStore>()((...args) => ({
    ...createAuthSlice(...args),
    ...createHelloSlice(...args),
  }));
};
