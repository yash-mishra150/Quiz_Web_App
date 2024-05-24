"use client";
import { useEffect } from 'react';

const useBeforeUnload = (message) => {
  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [message]);
};

export default useBeforeUnload;
