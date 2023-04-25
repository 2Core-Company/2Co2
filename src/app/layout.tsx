import 'server-only'
import { Poppins, Poiret_One } from 'next/font/google'

import SupabaseListener from '../components/supabase/supabase-listener'
import SupabaseProvider from '../components/supabase/supabase-provider'
import '../../style/globals.css'
import { createClient } from '../utils/supabase-server'


const poiretOne = Poiret_One({
  display: 'swap',
  weight: ['400'],
  variable: '--font-poiretOne',
})

const poppins = Poppins({
  display: 'swap',
  weight: ['400'],
  variable: '--font-poppins',
})

export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="pt-br" className={`text-white bg-background font-poppins ${poiretOne.variable} ${poppins.variable}`}>
      <head />
      <title>ToDos</title>
      <body className='w-full h-full'>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
