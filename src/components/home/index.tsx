

import UserContext from '../context/UserContext'
import React, { useContext} from 'react'
import Header from './header'
import Projects from './projects'


function Index() {
    const { dataUser } = useContext(UserContext)
  return (
    <section className=''>
      <Header dataUser={dataUser}/>
      <div className='w-full flex justify-center mt-[20px]'>
        <div className='w-[70%] max-lg:w-[95%]'>
          <Projects dataUser={dataUser}/>
        </div>
      </div>
    </section>
  )
}

export default Index