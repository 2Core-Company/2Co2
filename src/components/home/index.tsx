'use client'

import AppContext from '@/app/appContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useSupabase } from '../supabase-provider'

function Index() {
    const { dataUser } = useContext(AppContext)
    const { supabase } = useSupabase()
    const router = useRouter()

    const handleLogout = async () => {
      const result = await supabase.auth.signOut()
      router.replace('/')
    }

  return (
    <div onClick={() => handleLogout()} className='text-white'>Sair</div>
  )
}

export default Index