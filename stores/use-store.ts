// This hook is for avoiding SSR hydration errors in Next.js
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data#usage-in-next.js

import { useState, useEffect } from 'react';

const useStore = <T, F>(
  // store: (callback: (state: T) => unknown) => unknown,
  store: <F>(selector: (state: T) => F) => F,
  callback: (state: T) => F,
) => {
  // const result = store(callback) as F;
  const result = store(callback);
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
