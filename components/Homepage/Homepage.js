"use client";
import React, { useState } from 'react'
import title from '../../assests/title.svg';
import HPV from '../../assests/Homepage_vector.svg';
import logo from "../../assests/CCC_logo.svg";
import Image from "next/image";
import welcome from '../../assests/Welcome.svg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Homepage() {
    const [formData, setFormData] = useState({
        "username": "",
        "email": ""
    });
    const [loading, setLoading] = useState(false);
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const router = useRouter();
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
            const emailRegex = /^[a-zA-Z]+(22|23)\d{5,6}@akgec\.ac\.in$/;
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!formData.email || !formData.username) throw toast.error("Please fill out all fields");
            else if (!nameRegex.test(formData.username.trim())) throw toast.error("Name cannot contain numbers");
            else if (!emailRegex.test(formData.email)) {
                throw toast.error("Enter College Email");
            }

            e.preventDefault();
            setLoading(true);
            const response = await axios.post("https://quiz-app-yl47.onrender.com/auth/otp/", formData);
            // console.log(formData);

            toast.promise(
                saveSettings(settings),
                {
                    loading: 'Saving...',
                    success: <b>OTP sent Successfully</b>,
                }
            );
            // Assuming formData is your FormData object
            const formDataString = JSON.stringify(Array.from(formData.entries()));

            // Store the stringified FormData in local storage
            localStorage.setItem('formData', formDataString);

            setTimeout(() => { router.push("/OTP") }, 1000);
            // window.location.href='/dashboard';

        } catch (err) {
            const errorResponse = new ErrorResponse(err)
            let errorMessage = errorResponse.getError();
            if (errorMessage) toast.error(errorMessage);
            // console.log(err.getError())
            // alert(`Failed to create user:\n${err.getError()}`)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='overflow-x-hidden sm:flex justify-between'>
            <section className='bg-[#21234B] h-[15rem] sm:h-screen w-screen sm:w-[30rem] lg:w-[40rem] place-content-center sm:p-10'>
                <Image className='bg-transparent mx-auto mt-6 sm:mt-auto w-40 sm:w-[21rem] m-auto' src={title} alt="alt" />
                <Image className='bg-transparent w-52 m-auto sm:w-auto mt-5 sm:my-16' src={HPV} alt="alt" />
            </section>
            <section className='m-auto mx-auto place-content-center'>
                <Image className='w-52 lg:w-64 m-auto' src={logo} alt="alt" />
                <h1 className=' m-auto text-lg sm:text-xs lg:text-lg text-[#4E63CE] w-[20rem] sm:w-[25rem] lg:w-[38.5rem] text-center leading-8'>
                    Unleash Your Knowledge : Dive into the Ultimate Quiz Experience
                    <span className=' text-xl sm:text-sm lg:text-xl font-bold text-[#21234B] mx-2 lg:mx-auto'> THINK | DEVELOPE | DEPLOY</span>
                </h1>
                <Image className='w-36 lg:w-auto m-auto mt-5 sm:mt-16' src={welcome} alt="alt" />
                <form className='flex flex-col my-5 sm:my-10' onSubmit={HandleSubmit}>
                    <input
                        type="text"
                        name="username"
                        autoComplete='off'
                        value={formData.username}
                        onChange={onChange}
                        placeholder="Enter Name"
                        className="  sm:w-[15rem] lg:w-[25rem] my-5 text-xl font-semibold h-16 lg:h-20 m-auto border bg-white border-slate-200 rounded-lg py-3 px-5 "
                    />
                    <input
                        type="email"
                        name="email"
                        autoComplete='off'
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Enter Email"
                        className="sm:w-[15rem] lg:w-[25rem] mb-5 text-xl font-semibold h-16 lg:h-20 border m-auto bg-white border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                    <button className=" w-[310px] sm:w-[15rem] lg:w-[25rem] text-xl items-center m-auto px-8 py-4 font-semibold tracking-wide text-white bg-[#21234B] rounded-lg h-20">
                        Send OTP
                    </button>
                </form>
            </section>
            <Toaster />
        </div>
    )
}
