"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Quiz = dynamic(() => import('../../components/quiz/Quiz.js'), { ssr: false });

import { useCookies } from '../../components/customHooks/useCookie.js'; 

const Page = () => {
  const { cookieValue } = useCookies('istrue'); 
  const router = useRouter();

  useEffect(() => {
    if (cookieValue === false) {
      router.push('/');
    }
  }, [cookieValue, router]);

  if (cookieValue === false) {
    return null; 
  }

  return (
    <div>
      <Quiz />
    </div>
  );
}

export default Page;
