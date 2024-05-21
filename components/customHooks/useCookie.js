"use client";
import { useState, useEffect, useCallback } from 'react';

export const useCookies = (cookieName) => {
  const getCookie = useCallback((name) => {
    if (typeof document === 'undefined') return null; // Ensure this runs only on client side
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }, []);

  const [cookieValue, setCookieValue] = useState(() => {
    const initialCookie = getCookie(cookieName);
    return initialCookie !== null ? initialCookie : false;
  });

  const updateCookieValue = useCallback(() => {
    const newCookieValue = getCookie(cookieName);
    if (newCookieValue !== cookieValue) {
      setCookieValue(newCookieValue !== null ? newCookieValue : false);
    }
  }, [cookieName, cookieValue, getCookie]);

  useEffect(() => {
    const handleStorageChange = () => {
      updateCookieValue();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateCookieValue]);

  const setCookie = useCallback((name, value, days) => {
    if (typeof document === 'undefined') return; 
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
    setCookieValue(value);

    // Trigger the storage event to notify other tabs/windows
    localStorage.setItem('cookieUpdate', Date.now());
  }, []);

  const removeCookie = useCallback((name) => {
    if (typeof document === 'undefined') return; // Ensure this runs only on client side
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setCookieValue(false);

    // Trigger the storage event to notify other tabs/windows
    localStorage.setItem('cookieUpdate', Date.now());
  }, []);

  return { cookieValue, setCookie, removeCookie };
};
