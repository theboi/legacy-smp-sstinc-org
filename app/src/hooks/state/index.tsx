import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";

type DispatchWithCallback<A> = (value: A, callback: Callback<A>) => void;

type Callback<S> = (state: S) => void | (() => void | undefined);

export const useStateWithCallback = <S,>(
  initialState: S,
  callback: Callback<S>
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
};

export const useStateWithCallbackInstant = <S,>(
  initialState: S,
  callback: Callback<S>
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => callback(state), [state, callback]);

  return [state, setState];
};

export const useStateWithCallbackLazy = <S,>(
  initialState: S
): [S, DispatchWithCallback<SetStateAction<S>>] => {
  const callbackRef = useRef(null);

  const [value, setValue] = useState(initialState);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = (newValue, callback) => {
    callbackRef.current = callback;

    return setValue(newValue);
  };

  return [value, setValueWithCallback];
};
