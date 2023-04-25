'use client'
import { useSupabase } from '@/components/supabase/supabase-provider'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/auth-helpers-nextjs'
import { DataUser } from '@/types/interface'
import UserContext from '../../components/context/UserContext'


export default function DashboardLayout({ children}: {children: React.ReactNode}) {
    const { supabase } = useSupabase()
    const router = useRouter()
    const [dataUser, setDataUser] = useState<DataUser>({id:'', name:'', email:'', photo_profile:'', provider_token:''})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function GetAuth(){
            try {
                const { data, error } = await supabase.auth.getSession()
                if(data.session?.provider_token){
                    return GetUserDataBase(data.session.user, data.session.provider_token)
                } 
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
        GetAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function GetUserDataBase(user: User, provider_token:string ){
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
                        provider_token: provider_token
                    }
                    
                    setDataUser(dataAuth)
                    return  setLoading(false)
                } 
                CreateUser(user, provider_token)
            }
        }catch(e){
            console.log(e)
        }
    }

    async function CreateUser(user:User, provider_token:string){
        const date = new Date()
        const dataCreatedUser = {
            id:user.user_metadata.provider_id,
            name: user.user_metadata.full_name,
            email: user.user_metadata.email,
            photo_profile:user.user_metadata.avatar_url,
            created_at:date,
            provider_token:provider_token
        }

        try{
            const { data, error } = await supabase .from('users').insert([
                {
                    id:user.user_metadata.provider_id,
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
            
            <UserContext.Provider value={{dataUser, setDataUser}}>
                {children}
            </UserContext.Provider>
            
        )
    }   
}