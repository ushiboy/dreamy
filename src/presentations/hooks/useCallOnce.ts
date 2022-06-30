import { useRef, useCallback } from "react";

export const useCallOnce = (fn: () => Promise<void> | void) => {
  const ref = useRef(false);
  const execute = useCallback(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    fn();
  }, [fn, ref]);

  return {
    execute,
  };
};
