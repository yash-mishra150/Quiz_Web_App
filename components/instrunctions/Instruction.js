import React from "react";
import Design from "../../assests/title.svg";
import Image from "next/image";
import mid from "../../assests/Group 1.svg";
import logo from "../../assests/CCC_logo.svg";

const Instruction = () => {
  return (
    <div className=" h-[100vh] lg:flex-row  sm:flex ">
      <div className=" bg-[#21234B] h-full w-[30rem] ">
        <div className="p-10 bg-transparent">
          <Image
            className="w-72 mt-5 m-auto bg-transparent"
            src={Design}
            alt="image"
          />
          <Image className="mt-16 h-full bg-transparent" src={mid} alt="alt" />
        </div>
      </div>
      <div className=" h-[44vh] bg-transparent">

      </div>

      <div className="flex flex-col mx-auto">
        <div className="w-[50vw] flex flex-col items-center">
          <div className="">
            <Image className="w-52" src={logo} alt="alt" />
          </div>
          <div className=" mx-auto flex flex-col items-center gap-8">
            <h1 className=" my-3 font-extrabold text-[#000] leading-7 text-[2.3vw]">
              Let&apos;s{" "}
              <span className=" text-[#34377A] font-extrabold">Begin!</span>
            </h1>
            <p className="text-[#4E63CE] font-normal text-[1.2vw]">
              Challenge Your Intellect: Welcome to the Ultimate College Quiz
              Experience!
            </p>
            <div className="mt-5 w-full bg-[#D9D9D9] h-auto rounded-xl font-medium">
              <div className=" w-fit mx-[2vw] mt-4 bg-transparent">
                <h1 className=" bg-transparent underline text-3xl">Instructions:-</h1>
                <div className=" bg-[#D9D9D9]">
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
            <div className=" flex w-full gap-2 text-[#34377A] font-medium">
              <input type="checkbox" className="mb-5"></input>
              <p className=" text-[2vh]">
                By selecting this checkbox, you affirm that you have thoroughly
                reviewed all provided instructions and hereby express your
                intent to commence the examination
              </p>
            </div>
          </div>
          <div className="m-auto mt-9 w-full cursor-pointer h-[5vh]">
            <button className="w-full bg-[#21234B] h-16 rounded-xl leading-6 text-xl text-[#fff] font-bold size-5 ">
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
