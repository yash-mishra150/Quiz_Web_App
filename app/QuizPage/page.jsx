"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Quiz = dynamic(() => import('../../components/quiz/Quiz.js'), { ssr: false });

import { useCookies } from '../../components/customHooks/useCookie.js'; // Adjust the path accordingly

const Page = () => {
  const { cookieValue } = useCookies('istrue'); // Replace 'myCookie' with the name of your cookie
  const router = useRouter();

  useEffect(() => {
    if (cookieValue === false) {
      router.push('/'); // Redirect to login or any other page if cookie is false
    }
  }, [cookieValue, router]);

  if (cookieValue === false) {
    return null; // Return null or a loading indicator while redirecting
  }

  return (
    <div>
      <Quiz />
    </div>
  );
}

export default Page;
