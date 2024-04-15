import React from 'react'
import Image from "next/image";
import Title from '../../assests/title.svg';
import Homepage_vector from '../../assests/Homepage_vector.svg';
import logo from '../../assests/CCC_logo.svg';
import welcome from '../../assests/Welcome.svg';

export default function Homepage() {
    return (
        <div className='flex'>
            <section className='bg-[#21234B] h-screen lg:w-[45rem] p-20'>
                <Image src={Title} alt="alt" className='bg-[#21234B] h-56' />
                <Image src={Homepage_vector} alt="alt" className='bg-[#21234B]' />
            </section>
            <section className='place-content-center'>
                <Image src={logo} alt="alt" className='ml-56 xl:ml-80' />
                <h1 className='text-[#4E63CE] text-sm xl:text-lg ml-36 w-full xl:ml-44'>Unleash Your Knowledge : Dive into the Ultimate Quiz Experience</h1>
                <h2 className=' text-sm xl:text-lg ml-[16rem] xl:ml-[17.5rem]'>THINK | DEVELOPE | DEPLOY</h2>
                <Image className='mt-10 ml-[16.5rem] xl:ml-[23rem]' src={welcome} alt="alt" />
                <form className='mt-10 ml-36 mr-10 xl:ml-56'>
                    <input
                        type="text"
                        id="name_id"
                        name="name"
                        placeholder="Name"
                        className="w-[28rem] border text-2xl mb-5 h-20 placeholder:text-[#707070] text-[#707070] font-medium border-slate-200 rounded-lg py-3 px-5 outline-none bg-white"
                    />
                    <br/>
                    <input
                        type="text"
                        id="email_id"
                        name="email"
                        placeholder="Email"
                        className="w-[28rem] h-20 text-2xl placeholder:text-[#707070] border font-medium text-[#707070] border-slate-200 rounded-lg py-3 px-5 outline-none	bg-white"
                    />
                    <button className="bg-[#21234B] w-[28rem] h-20 text-2xl mt-5 text-white rounded-xl">
                        Send OTP
                    </button>
                </form>
            </section>
        </div>
    )
}
