'use client'
import { useSupabase } from '@/components/supabase-provider'
import React, {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/auth-helpers-nextjs'
import  NavBar from '../../components/navbar'
import AppContext from '../appContext'
import { DataUser } from '@/types/interface'



export default function DashboardLayout({ children}: {children: React.ReactNode}) {
    const { supabase } = useSupabase()
    const router = useRouter()
    const [dataUser, setDataUser] = useState<DataUser>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function GetAuth(){
            try {
                const { data, error } = await supabase.auth.getSession()
                if(data.session){
                    return GetUserDataBase(data.session.user)
                } 
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
        GetAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function GetUserDataBase(user: User){
        try{
            const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', user.email)

            if(data){
                if(data[0]){
                    const dataAuth = {
                        id:data[0].id,
                        name: data[0].name,
                        email: data[0].email,
                        photo_profile:user.user_metadata.avatar_url,
                        coworkers: data[0].coworkers,
                    }
                    
                    setDataUser(dataAuth)
                    return  setLoading(false)
                } 
                CreateUser(user)
            }
        }catch(e){
            console.log(e)
        }
    }

    async function CreateUser(user:User){
        const date = new Date()
        const dataCreatedUser = {
            name: user.user_metadata.full_name,
            email: user.user_metadata.email,
            photo_profile:user.user_metadata.avatar_url,
            created_at:date
        }

        try{
            const { data, error } = await supabase .from('users').insert([
                {
                    name: user.user_metadata.full_name,
                    email: user.user_metadata.email,
                    created_at:date
                }
            ])
             setDataUser(dataCreatedUser)
             return setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    if(!loading){
        return(
            <AppContext.Provider value={{dataUser, setDataUser}}>
                <section className='flex'>
                    <NavBar dataUser={dataUser}/>
                    {children}
                </section>
            </AppContext.Provider>
        )
    }   
}
