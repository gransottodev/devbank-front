import Image from 'next/image'
import user from '../../public/user.jpg'
import {Loader2} from 'lucide-react'

interface AsideProps {
  firstName: string;
  lastName: string;
  page: string;
}


function openModal() {
  const event = new CustomEvent('openModal')
  window.dispatchEvent(event)
}

export function Aside(props: AsideProps) {


  return (
    <aside className="w-full bg-cardbg  rounded-lg lg:h-96 lg:w-56">

      <div className="bg-infocard h-64 rounded-lg p-4">
        <Image src={user} className='w-16 h-16 rounded-full' alt='user' priority />
        {props.firstName && (
          <h1 className="mt-14 text-4xl">{props.firstName} {props.lastName}</h1>
        )}
        {!props.firstName && (
          <Loader2 className='animate-spin mt-14 text-center'/> 
        )}
      </div>
      <div className="flex flex-col items-start p-4 gap-3">
        {props.page === "dashboard" && (
          <button className='text-white' onClick={openModal}>Criar novo contador</button>
        )}
      </div>
    </aside>
  )
}