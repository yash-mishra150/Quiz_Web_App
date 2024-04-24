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
      <section className='bg-[#21234B] h-[16rem] sm:h-screen w-screen sm:w-[30rem] lg:w-[40rem] place-content-center sm:p-10'>
        <Image className='bg-transparent mx-auto mt-16 sm:mt-auto w-40 sm:w-[21rem] m-auto' src={Design} alt="alt" />
        <Image className='bg-transparent w-52 m-auto sm:w-auto mt-5 sm:my-16' src={mid} alt="alt" />
      </section>
      <section className='m-auto mx-auto place-content-center'>
        <div className=" mt-20 md:mt-0 sm:w-[45vh] md:w-[48vh] lg:w-[50vw] mx-5 flex flex-col items-center">
          <div className="">
          <Image className='w-52 -mt-10 lg:w-64' src={logo} alt="alt" />
          </div>
          <div className=" mx-auto flex flex-col items-center gap-2 sm:gap-8">
            <h1 className=" sm:my-3 font-extrabold text-[#000] sm:leading-7 sm:text-[2.3vw]">
              Let&apos;s{" "}
              <span className=" text-[#34377A] font-extrabold">Begin!</span>
            </h1>
            <p className="text-[#4E63CE] font-normal text-center text-sm lg:text-[1.2vw]">
              Challenge Your Intellect: Welcome to the Ultimate College Quiz
              Experience!
            </p>
            <div className="mt-5 mx-10 w-full xl:w-full bg-[#D9D9D9] h-auto rounded-xl font-medium">
              <div className="w-fit mx-[2vw] mt-4 bg-transparent">
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
              <div className="m-auto mt-9 w-full cursor-pointer h-[5vh]">
                <button disabled={!ischecked} className=" disabled:bg-[#353757] bg-[#21234B]  w-full  h-16 rounded-xl mb-5 sm:mb-0 leading-6 text-xl text-[#fff] font-bold size-5 ">
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
