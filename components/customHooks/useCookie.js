import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing cookies
export const useCookies = (cookieName) => {
  const getCookie = useCallback((name) => {
    if (typeof document === 'undefined') return null; // Ensure this runs only on client side
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        const value = cookie.substring(name.length + 1, cookie.length);
        return value !== '' ? value : null;
      }
    }
    return null;
  }, []);

  const [cookieValue, setCookieValue] = useState(() => {
    const initialCookie = getCookie(cookieName);
    return initialCookie !== null ? initialCookie : false; // Default to false if cookie not present
  });

  useEffect(() => {
    const cookie = getCookie(cookieName);
    setCookieValue(cookie !== null ? cookie : false); // Update value even if cookie is null
  }, [cookieName, getCookie]);

  const setCookie = useCallback((name, value, days) => {
    if (typeof document === 'undefined') return; // Ensure this runs only on client side
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
    setCookieValue(value); // Update the state with the new value
  }, []);

  const removeCookie = useCallback((name) => {
    if (typeof document === 'undefined') return; // Ensure this runs only on client side
    document.cookie = name + '=; Max-Age=-99999999;';
    setCookieValue(false); // Update the state with false when removing the cookie
  }, []);

  return { cookieValue, setCookie, removeCookie };
};
