import 'server-only'
import { Inter } from 'next/font/google'

import SupabaseListener from '../components/supabase-listener'
import SupabaseProvider from '../components/supabase-provider'
import '../../style/globals.css'
import { createClient } from '../utils/supabase-server'

const inter = Inter({
  variable: '--font-inter',
  display: 'swap'
});

export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="pt-br" className={`bg-background w-screen h-full font-inter ${inter.variable}`}>
      <head />
      <title>ToDos</title>
      <body className='max-w-screen h-full'>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
