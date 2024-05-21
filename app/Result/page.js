import React from 'react'
import dynamic from 'next/dynamic';
const Result = dynamic(() => import('../../components/Result and leaderboard/Result'), { ssr: false });

const page = () => {
  return (
    <div>
      <Result  />
    </div>
  )
}

export default page
