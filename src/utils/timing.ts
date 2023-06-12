import {useCallback, useEffect, useRef} from 'react';

export function useTimeout(callback: () => void, delay = 0): () => void {
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  useEffect(() => {
    if (delay >= 0) {
      timeoutIdRef.current = setTimeout(callback, delay);
    }
    return cancel;
  }, [callback, delay, cancel]);

  return cancel;
}
