import { useEffect } from 'react';
import { addListener, launch, removeListener, stop } from 'devtools-detector';

const useDevtoolsStatus = (callback) => {
  useEffect(() => {
    // Add listener to execute the callback when DevTools status changes
    const listener = (open) => {
      if (open) {
        callback();
      }
    };
    addListener(listener);

    // Launch detection
    launch();

    // Cleanup: remove listener and stop detection when component unmounts
    return () => {
      removeListener(listener);
      stop();
    };
  }, [callback]); // Depend on the callback function to re-run the effect if it changes
};

export default useDevtoolsStatus;
