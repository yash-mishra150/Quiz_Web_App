"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Nimbus from "../../assests/NIMBUS FONT 2.svg";
import CCC from "../../assests/CCC.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Result from "../../app/Result/page";
import toast, { Toaster } from 'react-hot-toast';
import {useCookies} from '../customHooks/useCookie';


const Quiz = () => {
  const { removeCookie } = useCookies('istrue');
 
  
  const [count, setCount] = useState(8);
  const [data, setData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  // const initialTimer = localStorage.getItem("left") || 2 * 60;
  // const [timeLeft, setTimeLeft] = useState(Number(initialTimer));
  const [timeLeft, setTimeLeft] = useState(45 * 60)
  const router = useRouter();
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
    data.forEach((question) => {
      if (selectedAnswers[question.id] === question.answer) {
        setScore((score) => score + 4);
      }
    });

    if (count < 47) {
      setCount(count + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const endHandler = () => {
    setQuizEnded(true);
  };


  useEffect(() => {

    if (quizEnded) return;


    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          endHandler();
          localStorage.setItem("left", 1 * 60)
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);


    return () => clearInterval(timer);
  }, [quizEnded]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const [Token, setToken] = useState("");

  useEffect(() => {
    localStorage.setItem("left", timeLeft);
    setToken(localStorage.getItem('token'));
  }, [timeLeft]);


  async function fetchData(id) {
    try {
      const response = await axios.get(
        `https://quiz-app-yl47.onrender.com/api/question/${id}/`
      );
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }
  // class ErrorResponse {
  //   constructor(errorObject) {
  //     this.errorObject = errorObject;
  //   }

  //   getError() {
  //     if (this.errorObject && this.errorObject.response && this.errorObject.response.data && 'error' in this.errorObject.response.data) {
  //       return this.errorObject.response.data.error;
  //     } else {
  //       return null; // or handle the case where the error structure doesn't match expectations
  //     }
  //   }
  // }

  const sentData = async (score, time_left, token) => {
    try {
      const res = await axios.post(
        'https://quiz-app-yl47.onrender.com/api/score/',
        {
          score: score,
          time_taken: timeLeft
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log("Score submitted successfully:");
    } catch (error) {
      // console.log("Error while submitting token and score", error);
      // const errorResponse = new ErrorResponse(err)
      // let errorMessage = errorResponse.getError();
      // toast.error(errorMessage);
    }
  }




  if (quizEnded) {


    localStorage.setItem("score", score);
    router.replace("/Result")
    sentData(score, timeLeft, Token);
    return null;



  }

  return (
    <div className="flex h-[100vh] overflow-x-hidden">
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
              {formatTime(timeLeft)}

            </p>
          </div>
          <div className=" bg-[#F36060] lg:w-[16vw] w-[25vw] h-full rounded-xl ">
            <button
              className=" w-full lg:mt-3 mt-2 font-medium text-[#fff]"
              onClick={endHandler}
            >
              End Test
            </button>
          </div>
        </div>

        <div className=" lg:min-h-[58vh] h-fit bg-[#F2F3F5] mt-[5vh] shadow-xl">
          {loading ? (<div className="loader bg-transparent  lg:mx-[40vw] lg:mt-[20vh] mx-[30vw]"></div>) :
            (data &&
              data.map((question) => (
                <div key={question.id} className="bg-transparent ml-10">
                  <div className=" bg-transparent flex justify-between mt-10">
                    <h3 className="bg-transparent lg:text-2xl text-xl font-bold lg:font-normal">
                      {question.question}
                    </h3>
                    <h1 className=" bg-transparent mr-[7vw] font-medium text-xl">
                      <span className=" bg-transparent ml-2 text-3xl lg:text-4xl">
                        {count - 7}
                      </span>
                      /40
                    </h1>
                  </div>

                  <ul className="bg-transparent lg:h-[30vh] h-fit mb-[3vh] lg:mb-0  w-fit mt-5 flex flex-col gap-[3vh] rounded-2xl">
                    {question.options.map((option, index) => (
                      <li
                        key={index}
                        className=" bg-[#D9D9D9] h-fit pl-2 flex gap-2 w-[65vw] lg:w-[55vw] p-[1vh] rounded-xl"
                      >
                        <input
                          type="radio"
                          id={`${question.id}-${index}`}
                          name={`question-${question.id}`}
                          value={option}
                          onChange={() => handleAnswerSelect(question.id, option)}
                          checked={selectedAnswers[question.id] === option}
                          className=" lg:w-[1vw] w-[4vw]"
                        />
                        <label
                          htmlFor={`${question.id}-${index}`}
                          className=" pt-1 font-medium w-full"
                        >
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )))}
        </div>
        <div className="mt-[5vh] ml-auto">
          <button
            className="bg-[#21234B] lg:w-[16vw] w-[30vw] h-[6vh]
            rounded-xl text-[#fff] lg:text-[2.2vh] md:text-[1.8vw] text-[1.5vh] mb-3"
            onClick={clickHandler}
          >
            Save & Next
          </button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Quiz;
