"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import CCC from "../../assests/Group 98.svg";
import Nimbus from "../../assests/NIMBUS FONT 2.svg";
import axios from "axios";
import { useState } from "react";
import ReactLoading from "react-loading";
import crown from "../../assests/crown.png"

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          "https://quiz-app-yl47.onrender.com/api/leaderboard/"
        );
        setLeaderboardData(response.data);
        // console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const top3Scores = leaderboardData.slice(0, 3);
  const restOfScores = leaderboardData.slice(3);

  const firstTopScore = top3Scores[0];
  const secondTopScore = top3Scores[1];
  const thirdTopScore = top3Scores[2];

  return (
    <div className=" h-fit bg-[#01091d]">
      <div className=" w-[95vw] mx-auto bg-transparent flex flex-col ">
        <div className=" bg-transparent flex justify-evenly h-[12vh]">
          <Image alt="alt" src={Nimbus} className=" bg-transparent w-[30vw] mt-[3vh]" />
          <Image alt="alt" src={CCC} className=" bg-transparent w-[30vw] mt-[4vh]  " />
        </div>
        <div className=" bg-transparent text-[#c0b9b9] font-medium mx-auto mt-[4vh] text-2xl  ">
          Leaderboard
        </div>
        <div className=" bg-transparent mx-auto flex justify-evenly gap-[4vw] mt-[10vh]">
          <div className=" bg-[#282626] text-[#fff] text-[1.5vh] lg:text-[2.2vh]  w-[25vw] h-[15vh] lg:h-[20vh] rounded-t-3xl flex flex-col items-center justify-evenly shadow-[#4083b6] shadow-md ">
            <h1 className=" bg-transparent mt-[-3vh]  lg:mt-[-4vh]  lg:text-[2.5vw] font-semibold text-xl text-[#4083b6]">
              2
            </h1>
            <div className=" bg-transparent w-fit flex flex-col items-center gap-2">
              <h1 className=" bg-transparent mx-2 lg:mx-0">
                {secondTopScore?.username}
              </h1>
              <p className=" bg-transparent  mx-2 lg:mx-0">
                {secondTopScore?.student_no}
              </p>
            </div>
            <div className=" bg-transparent  ">
              <p className=" bg-transparent text-[#4083b6] font-semibold">
                {secondTopScore?.score}
              </p>
            </div>
            <div className=" bg-transparent">
              {" "}
              <p className=" bg-transparent">{secondTopScore?.time_taken}</p>
            </div>
          </div>
          <div className=" bg-[#282626] text-[#fff] text-[1.5vh] lg:text-[2.2vh] w-[25vw] h-[18vh] mt-[-3vh] lg:h-[23vh] shadow-md shadow-[#e2e54b] rounded-t-3xl flex flex-col items-center justify-evenly ">
           <Image alt="alt" src={crown}  className=" bg-transparent w-[14vw] h-[8vh] mt-[-7vh] lg:h-[12vh] lg:w-[7vw] lg:mt-[-8vh]"/>
            <div className=" bg-transparent w-fit flex flex-col items-center gap-2 mt-[-2.6vh]">
              <h1 className=" bg-transparent  mx-2 lg:mx-0">
                {" "}
                {firstTopScore?.username}
              </h1>
              <p className=" bg-transparent  mx-2 lg:mx-0">
                {firstTopScore?.student_no}
              </p>
            </div>
            <div className=" bg-transparent ">
              <p className=" bg-transparent text-[#e2e54b] font-semibold ">
                {firstTopScore?.score}
              </p>
            </div>
            <div className=" bg-transparent">
              {" "}
              <p className=" bg-transparent"> {firstTopScore?.time_taken}</p>
            </div>
          </div>
          <div className=" bg-[#282626] text-[#fff] text-[1.5vh] lg:text-[2.2vh] w-[25vw] h-[15vh] lg:h-[20vh] shadow-md shadow-[#49dc69] rounded-t-3xl flex flex-col items-center justify-evenly ">
            <h1 className=" bg-transparent mt-[-3vh] lg:mt-[-4.8vh] lg:text-[2.5vw] font-semibold text-xl lg:text-2xl text-[#49dc69]">
              3
            </h1>
            <div className=" bg-transparent w-fit flex flex-col items-center gap-2">
              <h1 className=" bg-transparent  mx-2 lg:mx-0">
                {thirdTopScore?.username}
              </h1>
              <p className=" bg-transparent  mx-2 lg:mx-0">
                {thirdTopScore?.student_no}
              </p>
            </div>
            <div className=" bg-transparent ">
              <p className=" bg-transparent text-[#49dc69] font-semibold">
                {thirdTopScore?.score}
              </p>
            </div>
            <div className=" bg-transparent">
              {" "}
              <p className=" bg-transparent"> {thirdTopScore?.time_taken}</p>
            </div>
          </div>
        </div>

        <div className=" bg-transparent text-[#fff] mt-[5vh]  mx-auto">
          {loading ? (
            <div className="loader bg-transparent lg:mx-[45vw] lg:mt-[10vh] w-fit mx-[35vw] mt-[8vh]"></div>
          ) : (
            <ul className=" bg-transparent w-[95vw] mt-[5vh] mx-auto">
              {restOfScores.map((score, index) => (
                <li
                  key={index}
                  className=" bg-transparent w-full flex justify-evenly border-b-2 border-[#393030] pb-[2vh] pt-[2vh]"
                >
                  <p className=" bg-transparent mx-[-6vw]"> {index + 4} </p>

                  <div className=" bg-transparent ">
                    <p className=" bg-transparent w-[30vw] lg:w-[20vw]">{score.username}</p>
                    <p className=" bg-transparent text-[1.3vh]">
                      {score.student_no}
                    </p>
                  </div>

                  <p className=" bg-transparent">{score.score}</p>
                  <p className=" bg-transparent"> {score.time_taken}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
