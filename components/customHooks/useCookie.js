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
        const value = cookie.substring(name.length + 1, cookie.length);
        return value !== '' ? value : null;
      }
    }
    return null;
  }, []);

  const [cookieValue, setCookieValue] = useState(() => {
    const initialCookie = getCookie(cookieName);
    return initialCookie !== null ? initialCookie : false;
  });

  useEffect(() => {
    const cookie = getCookie(cookieName);
    if (cookie !== null && cookie !== cookieValue) {
      setCookieValue(cookie);
    } else if (cookie === null && cookieValue !== false) {
      setCookieValue(false);
    }
  }, [cookieName, getCookie, cookieValue]);

  const setCookie = useCallback((name, value, days) => {
    if (typeof document === 'undefined') return; // Ensure this runs only on client side
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
    setCookieValue(value);
  }, []);

  const removeCookie = (name) => {
    if (typeof document === 'undefined') return; // Ensure this runs only on client side
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const name = cookie.split('=')[0];
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=example.com`;
    }
    setCookieValue(false);
  }

  return { cookieValue, setCookie, removeCookie };
};
