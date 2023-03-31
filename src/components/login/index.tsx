'use client'
import React, { useEffect, useState } from 'react'
import { useSupabase } from '../supabase-provider';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Logo from '../../../public/icons/logo.svg'
import { useRouter } from 'next/navigation';

function Login() {
    const { supabase } = useSupabase()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        VerifyTokenUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function VerifyTokenUser(){
      try{
        const { data, error } = await supabase.auth.getSession()
        if(data.session){
          router.replace('/Dashboard')
        } else {
          setLoading(false)
        }
      }catch(error){
        console.log(error)
      }
    }

    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/Dashboard';
      // Make sure to include `https://` when not localhost.
      url = url.includes('http') ? url : `https://${url}`;
      // Make sure to including trailing `/`.
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
      return url;
    };
  
    const handleGitHubLogin = async () => {
      const result = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: getURL()
        }
      })
      console.log(result)
    }

    if(!loading)
      return (
        <section className='text-emerald-400 w-full h-full flex flex-col items-center relative px-[20px] max-sm:px-[10px]'>
          <Image src={Logo} width={70} height={70} alt='Logo do 2Co' className='self-start mt-[5px]'/>
          <p className='text-[50px] max-md:text-[40px] max-sm:text-[32px] max-lsm:text-[27px] mt-[50px] text-center'>Faça Login e comece  <br/> a organizar os seus ToDos</p>
          <div className='flex mt-[100px] max-sm:mt-[60px] text-emerald-400 '>
            <div className='drop-shadow-[0_4px_4px_rgba(25,185,67,0.9)] hover:drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)]  cursor-pointer hover:scale-105  group hover:text-white duration-300 border-emerald-400  hover:border-white border-[2px] px-[10px] py-[8px] rounded-[5px] relative'>
              <div className='flex'>
                <button onClick={handleGitHubLogin} className='text-[20px] max-lsm:text-[18px] mr-[10px]'>
                  Entrar com GitHub
                </button>
                <GitHubLogoIcon width={30} height={30}  className='group-hover:text-white group-hover:rotate-[17deg] duration-300'/>
              </div>
            </div>
          </div>
        </section>
      )
}

export default Login