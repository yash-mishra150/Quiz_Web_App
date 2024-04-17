"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Nimbus from "../assests/NIMBUS FONT 2.svg";
import CCC from "../assests/CCC.svg";
import axios from "axios";

const Quiz = () => {
  const [count, setCount] = useState(8);
  const [data, setData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  

  useEffect(() => {
    fetchData(count);
  }, [count]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };

  const clickHandler = () => {
    if (count <= data.length + 7) {
      console.log(data.length);
  
      data.forEach((question) => {
        if (selectedAnswers[question.id] === question.answer) {
          setScore((score) => score + 2);
          console.log(score);
        }
      });
  
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        console.log(newCount); 
        return newCount;
      });
    } else {
        setScore((prevScore) => {
            const newScore = prevScore + 2;
            console.log("Total Score:", newScore);
            // Log the updated count
            return newScore;
          });

      console.log("Quiz ended");
    }
  };
  

  async function fetchData(id) {
    try {
      const response = await axios.get(
        `https://quiz-app-yl47.onrender.com/api/question/${id}/`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <div className="flex h-[100vh]">
      {/* <div className=' bg-[#21234B] w-[7vw]'><Image src={CCC} className=' bg-transparent ' /> </div> */}
      <div className="w-[90vw] mx-auto flex flex-col">
        <div className="w-full bg-[#34377A] h-[8vh] mt-4 rounded-xl">
          <Image
            src={Nimbus}
            className=" bg-transparent mx-auto mt-auto h-full"
          />{" "}
        </div>
        <div className="flex justify-between mt-[5vh]">
          <div className="bg-[#21234B] lg:w-[16vw] w-[25vw] h-full rounded-xl text-[#fff] lg:text-[2.2vh] md:text-[1.8vw] text-[1.5vh] animate-bounce">
            <p className=" bg-transparent w-fit  mx-auto">Time Left:</p>
            <p className=" bg-transparent  font-medium w-fit mx-auto">
              45:00 mins
            </p>
          </div>
          <div className=" bg-[#F36060] lg:w-[16vw] w-[25vw] h-full rounded-xl ">
            <button className=" w-full lg:mt-3 mt-2 font-medium text-[#fff]">
              End Test
            </button>
          </div>
        </div>
        <div className=" h-[55vh] bg-[#F2F3F5] mt-[5vh] shadow-xl">
          {data &&
            data.map((question) => (
              <div key={question.id} className="bg-transparent">
                <h3 className="bg-transparent">{question.question}</h3>
                <ul className="bg-transparent">
                  {question.options.map((option, index) => (
                    <li key={index} className="bg-transparent">
                      <input
                        type="radio"
                        id={`${question.id}-${index}`}
                        name={`question-${question.id}`}
                        value={option}
                        onChange={() => handleAnswerSelect(question.id, option)}
                        checked={selectedAnswers[question.id] === option}
                      />
                      <label htmlFor={`${question.id}-${index}`}>
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="mt-[5vh] ml-auto">
          <button
            className="bg-[#21234B] lg:w-[16vw] w-[30vw] h-[6vh]
            rounded-xl text-[#fff] lg:text-[2.2vh] md:text-[1.8vw] text-[1.5vh]"
            onClick={clickHandler}
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
