'use client'
import React from 'react'
import Image from 'next/image'
import Logo2Co from '../../../public/icons/logo.svg'
import { DataUser } from '@/types/interface'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon } from '@radix-ui/react-icons'
import { useSupabase } from '../supabase/supabase-provider';
import { useRouter } from 'next/navigation'

interface Props{
    dataUser:DataUser
}

function Header({dataUser}:Props) {
    const { supabase } = useSupabase()
    const router = useRouter()

    async function Logout(){
        const result = await supabase.auth.signOut()
        router.replace('/')
    }

  return (
    <div className='flex justify-center py-[10px] border-b-[1px] border-b-emerald-400/50'>
        <div className='flex justify-between w-full px-[20px] max-sm:px-[5px]'>
            <div className='flex gap-[10px] items-center'>
                <div className='w-[60px] max-sm:w-[55px] h-[50px] max-sm:h-[45px] flex items-center justify-center rounded-full'>
                    <Image src={Logo2Co} alt="Logo 2Co" priority/>
                </div>

                <div className='w-[1px] h-[30px] bg-white rotate-[20deg] mx-[10px]'/>

                <div className='w-[50px] max-sm:w-[40px] h-[50px] max-sm:h-[40px] p-[3px] flex items-center justify-center border-[1px] border-emerald-500/70 rounded-full'>
                    <Image src={dataUser.photo_profile} alt="Logo 2Co" height={35} width={35} priority className='w-full h-full rounded-full'/>
                </div>

                <p className='text-[22px] max-sm:text-[20px] max-lsm:text-[18px] max-w-[400px] max-lg:max-w-[300px] max-sm:max-w-[200px] max-lsm:max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap'>{dataUser.name}</p>
            </div>



            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className='outline-none'>
                        <Image src={dataUser.photo_profile} alt="Logo 2Co" width={45} height={45} priority className='rounded-full'/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-background border-[2px] border-[#838282] rounded-[4px]" sideOffset={2}>

                        <DropdownMenu.Item onClick={() => Logout()} className="outline-none flex items-center gap-[5px] group hover:bg-[#fb7e7e] hover:text-black  px-[5px] cursor-pointer rounded-[4px]">
                            <p className='text-[18px] font-poppins'>Sair</p>
                            <ExitIcon width={18} />
                        </DropdownMenu.Item>

                        <DropdownMenu.Arrow className="fill-[#838282]" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
  </div>
  )
}

export default Header