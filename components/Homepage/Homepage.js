"use client";
import React, { useRef, useState, useEffect } from 'react'
import title from '../../assests/title.svg';
import HPV from '../../assests/Homepage_vector.svg';
import logo from "../../assests/CCC_logo.svg";
import Image from "next/image";
import welcome from '../../assests/Welcome.svg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import trim from "lodash/trim";
import { serialize } from 'cookie';

const SITE_KEY = trim("6Lcd2CMpAAAAAKLqwdxjTgnWwzSgAGEgtl0BVOng");

export default function Homepage() {
    const recaptcha = useRef();
    const [formData, setFormData] = useState({
        "username": "",
        "email": "",
        "student_no": "",
        "recaptchaToken": ""
    });
    const [loading, setLoading] = useState(false);
    const onChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // useEffect(() => {
    //     console.clear();
    //   }, []);

    const handleRecaptchaChange = (value) => {
        formData.recaptchaToken = trim(value);
    }
    
    let router = useRouter();

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
            recaptcha.current.reset();
            const emailRegex = /^[a-zA-Z]+(22|23)\d{5,6}@akgec\.ac\.in$/;
            const nameRegex = /^[a-zA-Z\s]*$/;

            const studentNumberRegex = /^(22|23)\d{5,6}$/;
            if (!formData.email || !formData.username) throw toast.error("Please fill out all fields");
            else if (!nameRegex.test(formData.username.trim())) throw toast.error("Name cannot contain numbers");
            // else if (!emailRegex.test(formData.email)) {
            //     throw toast.error("Enter College Email");
            // }
            else if (!studentNumberRegex.test(formData.student_no)) {
                return toast.error("Invalid Student Number");
            }

            e.preventDefault();
            setLoading(true);
            const response = await axios.post("https://quiz-app-yl47.onrender.com/auth/otp/", formData);
            // console.log(response);
            let Email = formData.email;
            let student = formData.student_no;
            let Username = formData.username;

            toast.success("OTP generated successfully!");
            setTimeout(() => router.push('/OTP'), 1000);
            // Assuming formData is your FormData object
            // const formDataString = JSON.stringify(Array.from(formData.entries()));

            document.cookie = serialize('email', Email, {
                maxAge: 7200, // 2 hrs
                path: '/',
            });
            // localStorage.setItem('student', student);
            // localStorage.setItem('Username', Username);
            // window.location.href='/dashboard';

        } catch (err) {
            const errorResponse = new ErrorResponse(err);
            const errorInfo = errorResponse.getError();
            if(errorInfo)
                return toast.error(errorInfo);
            
            // console.log(err)
            // alert(`Failed to create user:\n${err.getError()}`)
        } finally {
            setLoading(false);
        }
        function saveFormData(formData) {
            // Create a new formData object without the 'captcha' key
            const modifiedFormData = { ...formData };
            delete modifiedFormData.recaptchaToken;

            // Convert the modified formData object to a JSON string
            const formDataJSON = JSON.stringify(modifiedFormData);

            // Store the JSON string in a cookie
            document.cookie = `formData=${encodeURIComponent(formDataJSON)}; max-age=7200; path=/`;
        }


        // Example usage:
        // Assuming formData is an object containing form data


        // Call the function to save the form data
        saveFormData(formData);
    }
    // const [isVisible, setIsVisible] = useState(false);
    // useEffect(()=>{ // Adjust this value to set the height threshold
    //     if(window.scrollY > 600){
    //         setIsVisible(true);
    //     }else{
    //         setIsVisible(false);
    //     }
    // },[]);
    useEffect(() => {
        localStorage.clear();
    }, [])

    return (
        <div className='overflow-x-hidden sm:flex justify-between'>
            <section className='bg-[#21234B] h-[35vh] sm:h-screen w-screen sm:w-[40vw] lg:w-[40vw] place-content-center sm:p-10'>
                <Image className='bg-transparent mx-auto mt-[3vh] sm:mt-auto w-[35vw] sm:w-[41vh] m-auto' src={title} alt="alt" />
                <Image className='bg-transparent h-[30vh] sm:h-[61vh] m-auto  sm:w-auto mt-[2vh] sm:my-[8vh]' src={HPV} alt="alt" />
            </section>
            <section className='m-auto mx-auto content-center'>
                <Image className='mt-[5vh] md:mt-auto w-auto h-[14vh] lg:h-[14vh] m-auto' src={logo} alt="alt" />
                {/* <h1 className={` m-auto md:m-0 text-sm sm:text-xs lg:text-lg text-[#4E63CE] w-[85vw] sm:w-[25rem] lg:w-[38.5rem] text-center ${isVisible ? `` : `hidden`}`}>
                    Unleash Your Knowledge : Dive into the Ultimate Quiz Experience
                </h1> */}
                <h1 className=' text-sm sm:text-sm lg:text-xl font-bold text-[#21234B] text-center lg:mx-auto'> THINK | DEVELOP | DEPLOY</h1>

                <Image className='h-[5vh] lg:h-[5vh] m-auto mt-5' src={welcome} alt="alt" />
                <form className='flex flex-col my-5 sm:my-2' onSubmit={HandleSubmit}>
                    <input
                        type="text"
                        name="username"
                        autoComplete='off'
                        value={formData.username}
                        onChange={onChange}
                        placeholder="Enter Name"
                        className=" w-[75vw] sm:w-[31vw] outline-none lg:w-[31vw] my-4 text-xl font-semibold h-[8vh] lg:h-[8vh] m-auto border bg-white border-slate-200 rounded-lg py-3 px-5 "
                    />
                    <input
                        type='number'
                        name="student_no"
                        autoComplete='off'
                        value={formData.student_no}
                        onChange={onChange}
                        style={{ "-moz-appearance": "textfield" }}
                        placeholder="Enter Student Number"
                        className=" w-[75vw] sm:w-[31vw] lg:w-[31vw] mb-4 text-xl font-semibold h-[8vh] lg:h-[8vh] border m-auto bg-white border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                    <input
                        type="email"
                        name="email"
                        autoComplete='off'
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Enter College Email"
                        className=" w-[75vw] sm:w-[31vw] lg:w-[31vw] mb-4 text-xl font-semibold h-[8vh] lg:h-[8vh] border m-auto bg-white border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                    <ReCAPTCHA
                        ref={recaptcha}
                        sitekey={SITE_KEY}
                        onChange={handleRecaptchaChange}
                        className='m-auto mb-5 text-center'
                    />
                    <button className=" w-[310px] sm:w-[31vw] lg:w-[31vw] text-lg items-center m-auto px-[8vw] py-[2vh] font-semibold tracking-wide text-white bg-[#21234B] rounded-lg h-[10vh]">
                        Send OTP
                    </button>
                </form>
            </section>
            <Toaster />
        </div>
    )
}
