import { useState, useEffect } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export function useLocalStorageState<T>( key: string, initialState: T): [T, SetState<T>] {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
