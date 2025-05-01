"use client"

import React from 'react'
import Image from 'next/image'
import Nimbus from "../../assests/NIMBUS FONT 2.svg"
import Mid from "../../assests/Group 1.svg"
import CCC from "../../assests/CCC_logo.svg"
import { useRouter } from 'next/navigation'
import { FaGithub } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { RiFlutterFill } from "react-icons/ri";
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from '../customHooks/useCookie';

const Result = () => {
  const { removeCookie } = useCookies('istrue');
    
  const router = useRouter();
  const [score, setScore]= useState(0);
    
  useEffect(() => {
    const storedScore=localStorage.getItem("score");
    
    if (storedScore) {
      setScore(parseInt(storedScore)); 
    }
  }, []);

  const res= score/4;
    
  function clickHandler() {
    router.push("/leaderboard");
  }
    
  useEffect(() => {
    removeCookie('istrue');
  }, [removeCookie]); 

  return (
    <div className='flex flex-col lg:flex-row min-h-screen w-full'>
      {/* Left sidebar */}
      <div className='flex flex-col items-center lg:justify-start justify-center lg:w-1/3 w-full bg-[#21234B] pt-4 lg:pt-10 lg:pb-0 pb-6'>
        <Image 
          alt="nimbus" 
          src={Nimbus} 
          className='bg-transparent w-[60%] lg:w-[70%] max-w-[300px]'
        />
        <Image 
          alt="result vector" 
          src={Mid} 
          className='bg-transparent w-[40%] lg:w-[60%] max-w-[250px] mt-4 lg:mt-16'
        />
      </div>

      {/* Right content */}
      <div className="flex flex-col items-center justify-center w-full lg:w-2/3 px-4 lg:px-8 py-8 lg:py-10">
        <div className="w-full max-w-3xl flex flex-col items-center">
          {/* CCC Logo */}
          <div className="w-full flex justify-center mb-6">
            <Image 
              alt="CCC logo" 
              src={CCC} 
              className="w-[60%] max-w-[250px]" 
            />
          </div>
          
          {/* Quiz result section */}
          <div className="w-full flex flex-col items-center gap-4 lg:gap-6">
            <h1 className="font-extrabold text-[#34377A] text-2xl sm:text-3xl lg:text-4xl text-center">
              Quiz Ended 
            </h1>
            <p className="font-normal text-lg sm:text-xl lg:text-2xl text-[#34377A] text-center">
              Good Work Champ!
            </p>
            
            {/* Score card */}
            <div className="w-full max-w-lg bg-[#D9D9D9] rounded-xl shadow-xl p-4 lg:p-6">
              <div className='text-center text-lg sm:text-xl font-bold mb-4'>Your Score: {score}</div>
              
              {/* Icons */}
              <div className='flex justify-center gap-8 my-4'> 
                <FaGithub className="text-2xl lg:text-3xl bg-transparent select-none"/>
                <FaReact className='text-2xl lg:text-3xl bg-transparent select-none'/>
                <RiFlutterFill className='text-2xl lg:text-3xl bg-transparent select-none'/>
              </div>
              
              {/* Stats section */}
              <div className='flex justify-center items-center gap-4 mt-6'>
                <div className='flex flex-col items-center'>
                  <h2 className='font-bold text-base sm:text-lg lg:text-xl'>Total Questions</h2>
                  <p className='font-bold text-lg sm:text-xl mt-2'>25</p>
                </div>
                
                <div className='border-solid border-black border-r-2 h-16 mx-2'></div>
                
                <div className='flex flex-col items-center'>
                  <h2 className='font-bold text-base sm:text-lg lg:text-xl'>Correct Questions</h2>
                  <p className='font-bold text-lg sm:text-xl mt-2'>{res}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Button */}
          <div className="w-full flex justify-center mt-6 lg:mt-8">
            <button 
              className="w-full max-w-xs bg-[#34377A] py-3 rounded-xl text-white font-bold text-lg" 
              onClick={clickHandler}
            >
              See Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
