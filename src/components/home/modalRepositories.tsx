import { MagnifyingGlassIcon, LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'
import React from 'react'
import Image from 'next/image'
import { DataUser, Repositeries } from '@/types/interface'
import styles from '../../../style/scrollBar.module.css'
import { useSupabase } from '../supabase/supabase-provider'
import { Octokit } from '@octokit/rest'

interface Props{
    dataUser:DataUser
    allRepositories:any,
    allProjects:any
    setAllRepositories: Function
    setAllProjects:Function
}

function ModalRepositories({dataUser, allRepositories, allProjects, setAllRepositories, setAllProjects} : Props) {
    const { supabase } = useSupabase()

    async function UploadProject1(dataRepositorie:any){
        const date = new Date()
        const data2 = {
            id:dataRepositorie.id,
            name: dataRepositorie.name,
            created_at:date,
            url:dataRepositorie.homepage,
            status: dataRepositorie.visibility,
            avatar: dataRepositorie.owner.avatar_url
        }
        try{
            const { data, error } = await supabase.from('projects').insert([
                data2
            ])
            console.log(error)

            setAllProjects([...allProjects,  data2])
            const dataProject:{id_project:string, id_user:string}[] = await GetCollaborators(dataRepositorie)
            UploadProject2(dataProject)
        }catch(error){
            console.log(error)
        }
    }

    async function GetCollaborators(dataRepositorie:any){
        const dataProject:{id_project:string, id_user:string}[] = []

        const octokit = new Octokit({
            auth: dataUser.provider_token
          })
          
        const response = await octokit.request('GET /repos/{owner}/{repo}/collaborators', {
        owner: dataRepositorie.owner.login,
        repo: dataRepositorie.name,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        })

        for(var i = 0; i< response.data.length; i++){
            const data:{id_project:string, id_user:string} = {
                id_project:dataRepositorie.id,
                id_user:response.data[i].id.toString()
            }
            dataProject.push(data)
        }

        return dataProject
    }

    async function UploadProject2(dataProject:{id_project:string, id_user:string}[]){
        try{
            const { data, error } = await supabase.from('projects_user').insert(dataProject)
            console.log(error)
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <div className='w-screen h-screen flex justify-center items-center top-0 left-0 bg-black/70 fixed backdrop-blur-sm'>
        <div className='bg-[#171717] max-w-[600px] max-h-[500px] w-[90%] max-sm:w-full h-full  rounded-[8px] border-[2px] border-[#5e5e5e] px-[10px] flex flex-col items-center relative py-[5px]'>
            <button onClick={() => setAllRepositories()} className='w-[28px] h-[26px] absolute right-[5px] top-[5px] flex justify-center items-center'>
                <div className='w-[3px] absolute h-[28px] rounded-[10px] bg-[#838282] rotate-45' />
                <div className='w-[3px] absolute h-[28px] rounded-[10px] bg-[#838282] rotate-[-45deg]' />
            </button>

            <p className='text-[25px] mt-[20px] text-center'>Importe Repositórios do GitHub</p>

            <label className='mt-[15px] w-[80%] flex border-[1px] border-[#838282] rounded-[4px] items-center gap-[5px] px-[5px] py-[2px]'>
                <MagnifyingGlassIcon width={25} height={25} className='text-[#838282]'/>
                <input className='text-[16px] placeholder:text-[#838282] outline-none bg-transparent' placeholder='Procurar...'/>
            </label>

            <div id={styles.box} className='border-[2px] border-[#838282] mt-[10px] w-full rounded-[4px] overflow-auto'>
                {allRepositories.map((repositorie:Repositeries, index:number) => {
                    if(allProjects){
                        const index  = allProjects.findIndex((project:any) => project.id == repositorie.id)
                        if(index != -1) return
                    }
                    return (
                        <div key={repositorie.id} className={`flex justify-between items-center py-[8px] px-[5px] ${index > 0 ?  'border-t-[1px] border-[#838282]' : ''}`}>
                            <div className='flex items-center gap-[10px] max-lsm:gap-[5px]'>
                                <Image src={repositorie.owner.avatar_url} width={45} height={45} alt="Logo do projeto" className='min-w-[45px] min-h-[45px] rounded-full'/>
                                <p className='text-[18px] overflow-hidden text-ellipsis w-[350px] max-sm:w-[180px] max-lsm:w-[130px]'>{repositorie.name}</p>

                                {repositorie.private ?  
                                    <LockClosedIcon  height={20} width={20} className='min-w-[20px] min-h-[20px] text-[#838282]'/> 
                                : 
                                    <LockOpen2Icon height={20} width={20} className='min-w-[20px] min-h-[20px] text-[#838282]'/>
                                }
                            </div>
                            <div>
                                <button onClick={() => UploadProject1(repositorie)}  className='bg-white text-black px-[5px] py-[3px] rounded-[4px] group hover:bg-transparent hover:text-white hover:border-white hover:border-[1px] duration-200'>
                                    <p>Importar</p>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>  
        </div>
    </div>
  )
}

export default ModalRepositories