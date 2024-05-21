import React from 'react'
import dynamic from 'next/dynamic';
const Leaderboard = dynamic(() => import('../../components/Result and leaderboard/Leaderboard'), { ssr: false });

const page = () => {
  return (
    <div >
      <Leaderboard/>
    </div>
  )
}

export default page
