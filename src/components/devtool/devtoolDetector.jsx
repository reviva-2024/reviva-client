import React, { useEffect, useState } from 'react';
import { addListener, launch, removeListener, stop } from 'devtools-detector';

const DevtoolsStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Add listener to update state when DevTools status changes
    const listener = (open) => {
      setIsOpen(open);
    };
    addListener(listener);

    // Launch detection
    launch();

    // Cleanup: remove listener and stop detection when component unmounts
    return () => {
      removeListener(listener);
      stop();
    };
  }, []);

  return <div>DevTools status: {isOpen ? 'open' : 'closed'}</div>;
};

export default DevtoolsStatus;
