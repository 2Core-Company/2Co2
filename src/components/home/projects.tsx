'use client'
import React, { useEffect, useState } from 'react'
import { DataUser, Project} from '@/types/interface'
import NavBarProjects from './navBarProjects'
import { useSupabase } from '../supabase/supabase-provider'
import Image from 'next/image'
import Link from 'next/link'
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'
import FormatDate from '@/utils/Others/formatDate'

interface Props{
  dataUser:DataUser
}

function Projects({dataUser}:Props) {
  const { supabase } = useSupabase()
  const [allProjects, setAllProjects] = useState<any>([])
  const [textSearch, setTextSearch] = useState('')


  
  useEffect(() => {
    GetIdProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function GetIdProjects(){
    const { data, error } = await supabase
      .from('projects_user')
      .select()
      .eq('id_user', dataUser.id)
      if(data){
        GetProjects(data)
      }
    
  }

  async function GetProjects(id_projects:any){

    var select =''
    for(var i = 0; i < id_projects.length; i++){
      if(i + 1 < id_projects.length){
        const selectId = `id.eq.${id_projects[i].id_project},`
        select = select + selectId 
      } else {
        const selectId = `id.eq.${id_projects[i].id_project}`
        select = select + selectId 
      }
    }
    
    const { data, error } = await supabase
      .from('projects')
      .select()
      .or(select)
    if(data){
      setAllProjects(data)
    } 
  }

  return (
    <div>
      <NavBarProjects dataUser={dataUser} allProjects={allProjects} setAllProjects={setAllProjects} setTextSearch={setTextSearch}/>
      {allProjects?.filter((project:any) => textSearch != '' ? project.name.includes(textSearch) : true).length > 0 ? 
        <div className='w-full flex flex-wrap gap-[10px] mt-[25px] max-sm:justify-center pb-[10px]'>
          {allProjects
          .filter((project:any) => textSearch != '' ? project.name.includes(textSearch) : true)
          .map((project:Project) => {
            return(
              <div key={project.id} className='w-[300px] h-[150px] border-[1px] border-emerald-500 rounded-[5px] px-[6px] py-[4px] group hover:border-white cursor-pointer'>
                <div className='w-full flex items-center gap-[5px]'>
                  <Image src={project.avatar} alt={'Avatar'} width={45} height={45} className='rounded-full'/>
                  <p className='truncate w-[240px]'>{project.name}</p>
                </div>  

                {project.url ? <Link href={project.url} target='__blank' className='truncate w-full text-neutral-400'>Url: {project.url}</Link> : <></>}
                
                <div className='flex gap-[5px] text-neutral-400 mt-[5px]'>
                  {project.status === 'private' ? 
                      <>
                        <p>Visibilidade: Privado</p>
                        <LockClosedIcon  height={20} width={20} className='min-w-[20px] min-h-[20px]'/> 
                      </>
                    : 
                      <>
                        <p>Visibilidade: Publico</p>
                        <LockOpen2Icon height={20} width={20} className='min-w-[20px] min-h-[20px]'/>
                      </>
                  } 
                </div>

                <p className='text-neutral-400 mt-[5px] w-full truncate'>Criado: {FormatDate(project.created_at)}</p>

              </div>
            )
          })}
        </div>

      : 

        <p className='text-center font-poiretOne mt-[40px] max-lg:mt-[20px] text-[50px] max-xl:text-[45px] max-lg:text-[45px] max-md:text-[35px] max-sm:text-[30px] max-lsm:text-[25px]'>
          Ops... <br/> Parece que você ainda nao importou nenhum projeto, clique em adicionar e importe o primeiro!
        </p>
      }

    </div>
  )
}

export default Projects