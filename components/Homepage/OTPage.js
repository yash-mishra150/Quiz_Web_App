"use client";
import React, { useState, useRef } from 'react'
import Image from "next/image";
import title from '../../assests/title.svg';
import OPV from '../../assests/OTPage.svg';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function OTPage() {
    const [otp, setotp] = useState({
        "otp": ""
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

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
            const response = await axios.post("https://quiz-app-yl47.onrender.com/auth/validate/", otp);
            // console.log(otp);
            toast.success('User created successfully!');

            // window.location.href='/dashboard';

        } catch (err) {
            setLoading(false)
            const errorResponse = new ErrorResponse(err)
            let errorMessage = errorResponse.getError();
            toast.error(errorMessage);
            // console.log(err)
            // console.log(err.getError())
            setTimeout(() => { router.push("/instruction") }, 1000);
            // alert(`Failed to create user:\n${err.getError()}`)
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className='overflow-x-hidden md:flex justify-between'>
                <section className='bg-[#21234B] h-[20.5rem] md:h-screen w-screen md:w-[30rem] lg:w-[40rem] place-content-center md:p-16'>
                    <Image className='bg-transparent mx-auto mt-5 md:mt-auto w-48 md:w-[21rem] m-auto' src={title} alt="alt" />
                    <Image className='bg-transparent w-64 m-auto md:w-auto mt-5 md:my-16' src={OPV} alt="alt" />
                </section>
                <section className="md:block flex justify-center flex-col  m-auto mt-10 md:mt-auto md:mx-auto place-content-center">
                    <div className='mt-5 md:mt-0 leading-10'>
                        <span className=' text-xl md:text-2xl lg:text-5xl font-bold text-[#21234B] w-[20rem] md:w-[25rem] lg:w-[20rem] mx-[7vh] md:mx-10'>
                            Enter OTP
                        </span>
                        <h1 className='ml-[7vh] text-sm md:text-xs lg:text-md text-[#4E63CE]'>sent on <span className='font-bold'>yash2212054@akgec.ac.in</span></h1>
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
                        <h1 className='md:ml-2 mt-10 text-lg md:text-xs lg:text-md text-[#4E63CE]'>Didn&apos;t Received? <span className='font-bold'>Resend</span></h1>
                        <div className='flex justify-center'>
                            <button className=" mt-20 md:mt-36 w-[310px] md:w-[15rem] lg:w-[25rem] text-2xl items-center m-auto px-8 py-4  font-semibold tracking-wide text-white bg-[#21234B] rounded-lg h-20">
                                Confirm
                            </button>
                        </div>

                    </form>
                    
                </section >
                
            </div >
            <Toaster/>
        </>
    )
}
