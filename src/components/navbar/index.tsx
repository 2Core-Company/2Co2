import React, { useState } from 'react'
import Image from 'next/image'


function Index(dataUser:any) {
  const[navbar, setNavbar] = useState(false)
  return (
    <div className='w-[170px] max-xl:w-0'>
        <div className=' w-[170px] flex flex-col items-center justify-center outline-none'>
            <button onClick={() => setNavbar(!navbar)} className='hidden max-xl:block z-[20] mt-[5px] cursor-pointer  w-[30px] h-[30px] outline-none'>
                <div className={`w-[30px] h-[4px] bg-[#ffffff] rounded-[8px] duration-300 ${navbar ? 'rotate-[135deg] absolute' : ''}`} />
                <div className={`w-[30px] h-[4px] bg-[#ffffff] rounded-[8px] my-[3px] ${navbar ? 'hidden' : ''}`} />
                <div className={`w-[30px] h-[4px] bg-[#ffffff] rounded-[8px] duration-300 ${navbar ? 'rotate-45 absolute' : ''}`} />
            </button>
        </div>
        <div className={`w-[170px] top-0 h-full fixed border-r-[2px] border-r-[#4A4A4A] px-[5px] ${navbar ? 'max-xl:left-0' : 'max-xl:left-[-200px]'}`}>
            <div className='w-[160px] flex mt-[35px] items-center'>
                <Image src={dataUser?.dataUser?.photo_profile} height={50} width={50} alt='Imagem de perfil' className='rounded-[8px] border-emerald-600 border-[1px]'/>
                <p className='text-[18px] text-[#D7D7D7] ml-[5px] overflow-x-hidden whitespace-nowrap text-ellipsis'>{dataUser?.dataUser?.name}</p>
            </div>
        </div>
    </div>
  )
}

export default Index