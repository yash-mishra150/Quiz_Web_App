"use client";
import React, { useState, useRef, useEffect, use } from 'react'
import Image from "next/image";
import title from '../../assests/title.svg';
import OPV from '../../assests/OTPage.svg';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useCookies} from '../customHooks/useCookie';


export default function OTPage() {
    useEffect(()=>{
        localStorage.clear();
    },[])
    const [otp, setotp] = useState({
        "otp": ""
    });
    const [token, setToken] = useState("");
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
    const { cookieValue, setCookie, removeCookie } = useCookies('istrue');
    
    const [data, setData] = useState('');
    useEffect(() => {
        
        // Function to read the email from the cookie
        const getEmailFromCookie = () => {
            const emailCookie = decodeURIComponent(document.cookie)
                .split('; ')
                .find(row => row.startsWith('email='));
            const extractedEmail = emailCookie ? emailCookie.split('=')[1] : null;
            return extractedEmail;
        };

        // Set email state with the value read from the cookie
        setData(getEmailFromCookie());
    }, []); // Empty dependency array to run only once on mount


    useEffect(() => {
        // Check if window is defined (i.e., if code is running on the client side)

        // Access localStorage here
        function getFormData() {
            // Get the cookie value
            const cookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('formData='));

            // If the cookie exists, extract the formDataJSON string and decode it
            if (cookie) {
                const formDataJSON = decodeURIComponent(cookie.split('=')[1]);
                // Parse the JSON string back into an object
                return JSON.parse(formDataJSON);
            } else {
                return null; // Return null if the cookie doesn't exist
            }
        }

        setFormData(getFormData());
        localStorage.setItem('token', token);


    }, [token]);
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
            if (this.errorObject && this.errorObject.response && this.errorObject.response.data && 'error' in this.errorObject.response.data) {
                return this.errorObject.response.data.error;
            } else {
                return null; // or handle the case where the error structure doesn't match expectations
            }
        }
    }

    async function HandleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post((process.env.NEXT_PUBLIC_OTP_API || ""), otp);
            // console.log(response);
            // const response = {'access': 2};
            setToken(response.data.token.access);
            toast.success('User created successfully!');
            setCookie('istrue', true, 7);
            setTimeout(() => { router.push("/instruction") }, 1000);


        } catch (err) {
            setLoading(false)

            const errorResponse = new ErrorResponse(err)
            let errorMessage = errorResponse.getError();
            toast.error(errorMessage);

        } finally {
            setLoading(false);
        }
    }
    async function handleResend(e) {
        try {
            e.preventDefault();
            const resend_response = await axios.post((process.env.NEXT_PUBLIC_RESENDAPI_KEY || ""), FormData);
            toast.success("OTP resend successfull");
            // console.log(FormData);
            

        }
        catch (err) {
            const errorResponse = new ErrorResponse(err)
            let errorMessage = errorResponse.getError();
            toast.error(errorMessage);
        }
        finally{
            setSeconds(60);
            setTimerComplete(false);
        }
    }
    const [seconds, setSeconds] = useState(() => {
        // Initialize from local storage if available, otherwise default to 60 seconds
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            const storedSeconds = localStorage.getItem('timerSeconds');
            return storedSeconds ? parseInt(storedSeconds, 10) : 60;
        }


    });
    const [timerComplete, setTimerComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => {
                    localStorage.setItem('timerSeconds', (prevSeconds - 1).toString());
                    return prevSeconds - 1;
                });
            } else {
                clearInterval(intervalId);
                setTimerComplete(true);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
      }, [])

    return (
        <>
            <div className='overflow-x-hidden sm:flex justify-between'>
                <section className='bg-[#21234B] h-[35vh] sm:h-screen w-screen sm:w-[50vw] lg:w-[40vw] place-content-center sm:p-10'>
                    <Image className='bg-transparent mx-auto mt-[3vh] sm:mt-auto w-[35vw] sm:w-[41vh] m-auto' src={title} alt="alt" />
                    <Image className='bg-transparent h-[30vh] sm:h-[61vh] m-auto sm:w-auto mt-[2vh] sm:my-[10vh]' src={OPV} alt="alt" />
                </section>
                <section className="md:block flex justify-center flex-col  m-auto mt-10 md:mt-auto md:mx-auto place-content-center">
                    <div className='mt-5 md:mt-0 leading-10'>
                        <span className=' text-xl md:text-[7vh] lg:text-[7vh] font-bold text-[#21234B] w-[20rem] md:w-[25rem] lg:w-[20rem] ml-[5vh] md:mx-10'>
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
                                    className=" w-[10vw] h-[10vw] sm:w-[8vh] sm:h-[8vh] text-black text-[5vw] sm:text-[3.5vh] text-center rounded-lg outline-none font-bold bg-white"
                                    key={index}
                                    ref={(input) => (inputRefs.current[index] = input)}
                                    onChange={(event) => onChange(index, event)}
                                    maxLength={1}
                                />
                            ))}

                        </div>
                        <h1 className='md:ml-2 mt-10 text-sm md:text-xs lg:text-md text-[#4E63CE]' >Didn&apos;t Received? <button onClick={handleResend} disabled={!timerComplete} className='font-bold disabled:text-[#4c5896] mr-1'>Resend</button>{isClient ? <>{minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</> : null}</h1>
                        <div className='flex justify-center'>
                            <button className="  w-[310px] mt-[20vh]  sm:w-[31vw] lg:w-[31vw] text-lg items-center m-auto px-[8vw] py-[2vh] font-semibold tracking-wide text-white bg-[#21234B] rounded-lg h-[10vh]">
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
