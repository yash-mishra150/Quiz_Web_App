import React from 'react'
import Image from "next/image";
import Title from '../../assests/title.svg';
import Homepage_vector from '../../assests/Homepage_vector.svg';
import logo from '../../assests/CCC_logo.svg';

export default function Homepage() {
    return (
        <div className='flex'>
            <div className='bg-[#21234B] h-screen w-[40rem] p-20'>
                <Image src={Title} alt="alt" className='bg-[#21234B] h-56' />
                <Image src={Homepage_vector} alt="alt" className='bg-[#21234B]' />
            </div>
            <div className='flex justify-center'>
                <Image src={logo} alt="alt" />
            </div>
        </div>
    )
}
