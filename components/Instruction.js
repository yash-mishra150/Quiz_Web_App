import React from "react";
import Design from "../assests/Group 9.svg";
import Image from "next/image";
import mid from "../assests/Group 1.svg";
import logo from "../assests/Group 5.svg";

const Instruction = () => {
  return (
    <div className=" h-[100vh] flex ">
      <div className=" bg-[#4E64CE] h-full w-[390px] relative">
        <div className=" absolute h-full bg-transparent">
          <Image
            className="h-full bg-transparent"
            src={Design}
            alt="image"
          ></Image>
        </div>
      </div>
      <div className=" absolute mt-[28vh] ml-[6vw] h-[44vh] bg-transparent">
        <Image className="mt-auto  h-full bg-transparent" src={mid} />
      </div>

      <div className="flex flex-col mx-auto">
        <div className="w-[50vw] flex flex-col items-center">
        <div className=" mt-[3vh]">
          <Image className="h-[13vh]" src={logo} />
        </div>
        <div className="mt-[5vh] mx-auto flex flex-col items-center gap-8">
          <h1 className=" font-extrabold text-[#000] leading-7 text-[2.3vw]">
            Let's <span className=" text-[#1178F2] font-extrabold">Begin!</span>
          </h1>
          <p className=" font-normal text-[1.2vw]">
            Challenge Your Intellect: Welcome to the Ultimate College Quiz
            Experience!
          </p>
          <div className="w-full bg-[#D9D9D9] h-[25vh] rounded-xl font-medium">
            <div className=" w-fit mx-[2vw] mt-4 bg-transparent">
            <h1 className=" bg-transparent text-2xl">Instructions:-</h1>
            <div className=" bg-[#D9D9D9]">

              <li className=" bg-transparent">
                This assessment test consists of 4 sections having 5 Questions
                each
              </li>
              <li className=" bg-transparent">We suggest you allow 90 minutes to complete the test.</li>
              <li className=" bg-transparent">
                Do not make click picture and copy question to any browser
              </li>
              <li className=" bg-transparent">The candidates are advised to read all options thoroughly</li>
              <li className=" bg-transparent">Use of calculator is prohibited</li>
            </div>
          </div>
          </div>
          <div className=" flex w-full gap-2 text-[#4E64CE] font-medium">
            <input type="checkbox" className=" mb-5"></input>
            <p className=" text-[2vh]">
              By selecting this checkbox, you affirm that you have thoroughly
              reviewed all provided instructions and hereby express your intent
              to commence the examination
            </p>
          </div>
        </div>
        <div className=" mt-[10vh] w-full cursor-pointer h-[5vh]">
          <button className="w-full bg-[#4E64CE] h-full rounded-xl leading-6 text-[#fff] font-bold size-5 ">Start Test</button>
        </div>
</div>
      </div>
    </div>
  );
};

export default Instruction;
