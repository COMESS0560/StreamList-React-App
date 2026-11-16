import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage';
export default function usePersistentState(key, defaultValue) {
  const [value, setValue] = useState(() => readStorage(key, defaultValue));
  useEffect(() => writeStorage(key, value), [key, value]);
  return [value, setValue];
}
