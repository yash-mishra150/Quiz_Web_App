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

const Result = () => {
 
    const router = useRouter();
    const [score, setScore]= useState(0);
    
    useEffect(() => {
         const storedScore=localStorage.getItem("score");
       
        if (storedScore) {
          setScore(parseInt(storedScore)); 
        }
      }, []);

      const res= score/4;
    function clickHandler ()
  {
     router.push("/leaderboard");
  }
  return (
    <div className=' flex flex-col lg:flex-row h-[100vh] '>
       <div className=' flex flex-col items-center lg:gap-[20vh]  lg:w-[35vw] w-[100vw] h-[20vh] lg:h-[100vh]  bg-[#21234B]'>
        <Image src={Nimbus} className=' bg-transparent lg:mt-[5vh] mt-[2vh] lg:w-[20vw]'/>
        <Image src={Mid} className=' bg-transparent lg:w-[20vw]  w-[25vw] md:w-[20vw] mt-5 lg:mt-0'/>
       </div>

       <div className="flex flex-col lg:mx-auto  mx-[15vw]  mt-[15vh] lg:mt-[10vh] lg:mt-0">
        <div className="w-[50vw] flex flex-col items-center">
          <div className="mt-[-8vw] lg:mt-[-1vw]">
            <Image className="lg:h-[20vh] w-[40vw] lg:w-[20vw] ml-[20vw] lg:mx-0 " src={CCC} />
          </div>
          <div className=" mx-auto flex flex-col items-center gap-8">
            <h1 className=" font-extrabold text-[#34377A] leading-7 mt-[-3vh] lg:mt-0 lg:text-[2.3vw] text-4xl">
              Quiz Ended 
            </h1>
            <p className=" font-normal lg:text-[1.2vw] text-2xl lg:text-[#34377A] text-[#000]">
              Good Work Champ!
            </p>
            <div className="lg:w-[45vw] w-[70vw] bg-[#D9D9D9] lg:h-[40vh] h-[30vh] rounded-xl font-medium shadow-xl">
                  
                 <div className=' bg-transparent lg:w-[20vw] mx-[9vw] mt-2 lg:mx-[16vw] text-xl font-bold '>Your Score : {score}</div>
                  <div className=' bg-transparent flex mt-[3vh] justify-evenly lg:w-[20vw] lg:h-[3vw] mx-auto'> 
                  <FaGithub className=" text-3xl bg-transparent select-none"/>
                  <FaReact className=' text-3xl bg-transparent select-none'/>
                  <RiFlutterFill className=' text-3xl bg-transparent select-none'/>

                  </div>
                 <div className=' bg-transparent lg:w-[40vw] w-[65vw] lg:mx-auto mx-[9vw] mt-[3vh] lg:mt-[5vh] flex justify-evenly'>
                      <div className=' bg-transparent flex flex-col gap-[2vh] font-bold lg:text-xl h-fit'>
                        <h1 className=' bg-transparent'>Total Qustions</h1>
                        <p className=' bg-transparent'>25</p>
                      </div>
                      <div className='border-solid border-black border-r-4'></div>
                      <div className=' bg-transparent flex flex-col gap-[2vh] font-bold lg:text-xl ml-[5vw] lg:ml-0'>
                        <h1 className=' bg-transparent'>Correct Questions</h1>
                        <p className=' bg-transparent'>{res}</p>
                      </div>
                    </div> 

            </div>
          </div>
          <div className=" lg:mt-[5vh] mt-[3vh] w-full cursor-pointer h-[5vh]">
            <button className=" lg:w-[30vw] w-[40vw] mx-[15vw]  lg:mx-[10vw] bg-[#34377A] h-full rounded-xl leading-6 text-[#fff] font-bold size-5 " onClick={clickHandler}>
              See Leaderboard
            </button>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Result
