"use client";
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
    setTimeout(() => { router.push("/QuizPage") }, 1000);
  }
  return (
    <div className='overflow-x-hidden sm:flex justify-between'>
      <section className='bg-[#21234B] h-[35vh] sm:h-screen w-screen sm:w-[40vw] lg:w-[40vw] place-content-center sm:p-10'>
        <Image className='bg-transparent mx-auto mt-[3vh] sm:mt-auto w-[35vw] sm:w-[41vh] m-auto' src={Design} alt="alt" />
        <Image className='bg-transparent h-[30vh] sm:h-[61vh] m-auto  sm:w-auto mt-[2vh] sm:my-16' src={mid} alt="alt" />
      </section>
      <section className='m-auto mx-auto place-content-center'>
        <div className=" mt-20 md:mt-auto sm:w-[45vh] md:w-[48vh] lg:w-[50vw] mx-5 flex flex-col items-center">
          <div className="">
          <Image className='w-auto h-[15vh] lg:h-[15vh] m-auto' src={logo} alt="alt" />
          </div>
          <div className=" mx-auto flex flex-col items-center gap-2 sm:gap-8">
            <h1 className=" sm:my-[2vh] font-extrabold text-[#000] sm:leading-7 sm:text-[5vh]">
              Let&apos;s{" "}
              <span className=" text-[#34377A] font-extrabold">Begin!</span>
            </h1>
            {/* <p className="text-[#4E63CE] font-normal text-center text-sm lg:text-[1.2vw]">
              Challenge Your Intellect: Welcome to the Ultimate College Quiz
              Experience!
            </p> */}
            <div className=" mx-8 w-full xl:w-full bg-[#D9D9D9] h-auto rounded-xl font-medium">
              <div className="w-fit mx-[2vw] mt-[1vh] bg-transparent">
                <h1 className=" bg-transparent underline text-2xl xl:text-3xl">Instructions:-</h1>
                <div className=" text-xs lg:text-sm bg-[#D9D9D9]">
                  <li className="my-2 bg-transparent">
                    This assessment test consists of 20 questions
                  </li>
                  <li className="mb-2 bg-transparent">
                    We suggest you allow 45 minutes to complete the test.
                  </li>
                  <li className="mb-2 bg-transparent">
                    Do not make click picture and copy question to any browser
                  </li>
                  <li className="mb-2 bg-transparent">
                    The candidates are advised to read all options thoroughly
                  </li>
                  <li className="mb-2 bg-transparent">
                    Use of calculator is prohibited
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
                <button disabled={!ischecked} className=" disabled:bg-[#353757] bg-[#21234B]  w-full  h-[8vh] rounded-xl mb-5 sm:mb-0 leading-6 text-xl text-[#fff] font-bold size-5 ">
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
