"use client";
// this is instruction page
import React, { useState } from "react";
import Design from "../../assests/title.svg";
import Image from "next/image";
import mid from "../../assests/Group 1.svg";
import logo from "../../assests/CCC_logo.svg";
import { useRouter } from 'next/navigation';

const Instruction = () => {
  const [ischecked, setChecked] = useState(false);
  function handleChange(e) {
    setChecked(!ischecked);
  }
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => { router.replace("/QuizPage") }, 1000);
  }
  return (
    <div className='overflow-x-hidden sm:flex justify-between'>
      <section className='bg-[#21234B] h-[35vh] sm:h-screen w-screen sm:w-[40vw] lg:w-[40vw] place-content-center sm:p-10'>
        <Image className='bg-transparent mx-auto mt-[3vh] sm:mt-auto w-[35vw] sm:w-[41vh] m-auto' src={Design} alt="alt" />
        <Image className='bg-transparent h-[30vh] sm:h-[61vh] m-auto  sm:w-auto mt-[2vh] sm:my-[8vh]' src={mid} alt="alt" />
      </section>
      <section className='m-auto place-content-center'>
        <div className=" mt-[5vh] md:mt-auto sm:w-[45vw] md:w-[48vw] lg:w-[50vw] mx-5 flex flex-col items-center">
          <div className="">
          <Image className='w-auto h-[14vh] lg:h-[14vh] m-auto' src={logo} alt="alt" />
          </div>
          <div className=" flex flex-col items-center gap-2 sm:gap-8">
            <h1 className=" sm:my-[2vh] font-extrabold text-[#000] sm:leading-7 sm:text-[5vh]">
              Let&apos;s{" "}
              <span className=" text-[#34377A] font-extrabold">Begin!</span>
            </h1>
            {/* <p className="text-[#4E63CE] font-normal text-center text-sm lg:text-[1.2vw]">
              Challenge Your Intellect: Welcome to the Ultimate College Quiz
              Experience!
            </p> */}
            <div className=" mx-[5vw] w-full xl:w-full bg-[#D9D9D9] h-auto rounded-xl font-medium">
              <div className="w-fit mx-[2vw] bg-transparent">
                <h1 className=" mt-[2vh] bg-transparent underline text-2xl xl:text-[4vh]">Instructions:-</h1>
                <div className=" text-xs lg:text-[2.3vh] bg-[#D9D9D9]">
                  <li className="my-[1.5vh] bg-transparent">
                    This assessment test consists of 20 questions
                  </li>
                  <li className="my-[1.5vh] bg-transparent">
                    We suggest you allow 30 minutes to complete the test.
                  </li>
                  <li className="my-[1.5vh] bg-transparent">
                    Do not make click picture and copy question to any browser
                  </li>
                  <li className="my-[1.5vh] bg-transparent">
                    The candidates are advised to read all options thoroughly
                  </li>
                  <li className="my-[1.5vh] bg-transparent">
                    Please Don&apos;t refresh the page
                  </li>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className=" flex w-full gap-2 text-[#34377A] font-medium">
                <input name="agree" onChange={handleChange} checked={ischecked} type="checkbox" className="mb-5 "></input>
                <p className=" text-sm xl:text-[2vh] ">
                  By selecting this checkbox, you affirm that you have thoroughly
                  reviewed all provided instructions and hereby express your
                  intent to commence the examination
                </p>
              </div>
              <div className="m-auto mt-[5vh] w-full cursor-pointer h-[5vh]">
                <button disabled={!ischecked} className=" disabled:bg-[#353757] bg-[#21234B]  w-full  h-[8vh] rounded-xl mb-5 sm:mb-auto leading-6 text-xl text-[#fff] font-bold size-5 ">
                  Start Test
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instruction;
