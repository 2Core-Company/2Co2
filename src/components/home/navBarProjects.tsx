import React, { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'

import { DataUser } from '@/types/interface'
import ModalRepositories from './modalRepositories'
import { Octokit } from '@octokit/rest'

  interface Props{
    dataUser:DataUser
    allProjects: any
    setAllProjects:Function
    setTextSearch:Function
  }

function NavbarProjects({dataUser, allProjects, setAllProjects, setTextSearch}:Props) {
  const [allRepositories, setAllRepositories] = useState<any>()

    async function GetRepositories(){
      const octokit = new Octokit({
        auth: dataUser.provider_token
      })
      
      const response = await octokit.request('GET /user/repos', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        sort:'created',
        visibility:'all',
        affiliation:'owner, collaborator, organization_member'
      })
      setAllRepositories(response.data)
    }

  return (
    <div className='flex justify-between gap-[10px]'>
      {allRepositories  ?  <ModalRepositories allRepositories={allRepositories} dataUser={dataUser} allProjects={allProjects} setAllRepositories={setAllRepositories} setAllProjects={setAllProjects}/> : <></>}
        <label className='w-full flex border-[1px] border-[#838282] rounded-[4px] items-center gap-[5px] px-[5px] py-[5px]'>
            <MagnifyingGlassIcon width={25} height={25} className='text-[#838282]'/>
            <input onChange={(text) => setTextSearch(text.target.value)} className='text-[18px] max-sm:text-[16px] placeholder:text-[#838282] outline-none bg-transparent' placeholder='Procurar...'/>
        </label>

        <button onClick={() => GetRepositories()} className=' group bg-white hover:bg-transparent border-[1px] border-white duration-200 rounded-[8px]'>
            <p className='text-black group-hover:text-white duration-200 max-sm:hidden px-[8px]'>Adicionar</p>
            <PlusIcon width={35} height={28} className='text-black group-hover:text-white duration-200 max-sm:block hidden ' />
        </button>
    </div>
  )
}

export default NavbarProjects