"use client";
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import title from '../../assests/title.svg';
import OPV from '../../assests/OTPage.svg';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function OTPage() {
    const [otp, setotp] = useState({
        "otp": ""
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [FormData, setFormData] = useState({
        "username": "",
        "email": "",
        "student_no": ""
    });
    const inputRefs = useRef([]);
    // const [email,setemail] = useState("");
    // setemail(localStorage.getItem('Email'));

    const [data, setData] = useState('');

    useEffect(() => {
        // Check if window is defined (i.e., if code is running on the client side)
        if (typeof window !== 'undefined') {
            // Access localStorage here
            const storedData = localStorage.getItem('email');
            if (storedData) {
                setData(storedData);
            }

            const formDataJSON = localStorage.getItem('formData');
            const formData = JSON.parse(formDataJSON);
            setFormData(formData);
        }
    }, []);
    // let Email = getItemFromLocalStorage('email');


    const onChange = (index, event) => {
        const value = event.target.value;
        // Only accept numeric input
        if (!/^\d*$/.test(value)) {
            return; // Exit the function if the input is not numeric
        }
        const nextIndex = index + 1;
        if (event.target.value && nextIndex < inputRefs.current.length) {
            inputRefs.current[nextIndex].focus();
        }
        if (nextIndex === inputRefs.current.length && event.target.value) {
            const Otp = inputRefs.current.reduce((acc, input) => acc + input.value, '');
            setotp({ otp: Otp });
        }

    };

    class ErrorResponse {
        constructor(errorObject) {
            this.errorObject = errorObject;
        }

        getError() {
            if (this.errorObject && this.errorObject.response && this.errorObject.response.data && 'errors' in this.errorObject.response.data) {
                return this.errorObject.response.data.errors;
            } else {
                return null; // or handle the case where the error structure doesn't match expectations
            }
        }
    }

    async function HandleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            // const response = await axios.post("https://quiz-app-yl47.onrender.com/auth/validate/", otp);
            console.log(response);
            toast.success('User created successfully!');
            // setTimeout(() => { router.push("/instruction") }, 1000);

            // window.location.href='/dashboard';

        } catch (err) {
            setLoading(false)
            const errorResponse = new ErrorResponse(err)
            let errorMessage = errorResponse.getError();
            toast.error(errorMessage);
            // console.log(err)
            // console.log(err.getError())

            // alert(`Failed to create user:\n${err.getError()}`)
        } finally {
            setLoading(false);
        }
    }
    // function getFormData() {
    //     // Retrieve the JSON string from localStorage
    //     const formDataJSON = localStorage.getItem('formData');

    //     // Parse the JSON string back into an object
    //     const formData = JSON.parse(formDataJSON);

    //     // Return the parsed object
    //     return formData;
    // }

    // Example usage:
    // Call the function to retrieve the form data
    // const formData = getFormData();
    async function handleResend(e) {
        try
        {e.preventDefault();
        const resend_response = await axios.post("https://quiz-app-yl47.onrender.com/auth/resend/", FormData);
        toast.success("OTP resend successfull");
        // console.log(FormData);
        setTimerComplete(false);
        setSeconds(60);
    }
    catch (err) {
        const errorResponse = new ErrorResponse(err)
        let errorMessage = errorResponse.getError();
        toast.error(errorMessage);
    }
    }
    // Now you can use the formData object as needed
    // console.log(formData);

    const [seconds, setSeconds] = useState(60);
    const [timerComplete, setTimerComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1); // Decrease seconds by 1
            } else {
                clearInterval(intervalId); // Stop the timer when seconds reach 0
                setTimerComplete(true); // Set timerComplete to true when timer finishes
            }
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // function handleSubmit(e){
    //   console.log("log")
    // }


    return (
        <>
            <div className='overflow-x-hidden md:flex justify-between'>
                <section className='bg-[#21234B] h-[20.5rem] md:h-screen w-screen md:w-[30rem] lg:w-[40rem] place-content-center md:p-16'>
                    <Image className='bg-transparent mx-auto mt-5 md:mt-auto w-48 md:w-[21rem] m-auto' src={title} alt="alt" />
                    <Image className='bg-transparent w-64 m-auto md:w-auto mt-3 md:my-16 drop-shadow-2xl' src={OPV} alt="alt" />
                </section>
                <section className="md:block flex justify-center flex-col  m-auto mt-10 md:mt-auto md:mx-auto place-content-center">
                    <div className='mt-5 md:mt-0 leading-10'>
                        <span className=' text-xl md:text-2xl lg:text-5xl font-bold text-[#21234B] w-[20rem] md:w-[25rem] lg:w-[20rem] ml-[5vh] md:mx-10'>
                            Enter OTP
                        </span>
                        <h1 className='ml-[5vh] md:ml-[3rem] text-sm md:text-xs lg:text-md text-[#4E63CE]'>sent on <span className='font-bold'>{data}</span></h1>
                    </div>
                    <form className='mx-10' onSubmit={HandleSubmit}>

                        <div className='m-auto flex justify-around gap-2 md:gap-5 mt-10'>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    type="tel"
                                    pattern="\d*"
                                    name="Otp"
                                    placeholder="_"
                                    autoComplete='off'

                                    className=" w-[2.5rem] h-[2.5rem] sm:w-[3rem] sm:h-[3rem] text-black text-sm md:text-2xl p-3 pl-4 sm:pl-[1.1rem] rounded-lg outline-none font-bold bg-white"
                                    key={index}
                                    ref={(input) => (inputRefs.current[index] = input)}
                                    onChange={(event) => onChange(index, event)}
                                    maxLength={1}
                                />
                            ))}

                        </div>
                        <h1 className='md:ml-2 mt-10 text-sm md:text-xs lg:text-md text-[#4E63CE]'>Didn&apos;t Received? <button onClick={handleResend} disabled={!timerComplete}  className='font-bold disabled:text-[#4c5896]'>Resend</button> {minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</h1>
                        <div className='flex justify-center'>
                            <button className=" mt-20 md:mt-36 w-[310px] md:w-[15rem] lg:w-[25rem] text-2xl items-center m-auto px-8 py-4  font-semibold tracking-wide text-white bg-[#21234B] rounded-lg h-20">
                                Confirm
                            </button>
                        </div>

                    </form>

                </section >

            </div >
            <Toaster />
        </>
    )
}
