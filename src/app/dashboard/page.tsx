"use client"

import { Aside } from "@/components/Aside";
import { Card } from "@/components/Card";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { GetCounters } from "@/services/api";
import { parseCookies } from "nookies";
import { HoursFormat } from '../../utils/hours.format'
import {Loader2} from 'lucide-react'
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";


interface CounterProps {
  _id: string;
  description: string;
  time: number;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [counter, setCounter] = useState<CounterProps | []>([])
  const [loading, setLoading] = useState(true)
  const route = useRouter()
  const { 'bank.Token': token } = parseCookies()


  useEffect(() => {
    if(!token){
      route.push('/')
      return
    }
    GetCounters(token).then(response => {
      setCounter(response.data)
      setLoading(false)
    })
  }, [])


  return (
    <main className="h-screen flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center">
      <Aside firstName={user?.firstName} lastName={user?.lastName} page="dashboard"/>
      {!loading && (
        <div className="flex flex-col gap-5 lg:h-96 lg:grid lg:grid-cols-3 lg:content-between">
          {counter.map(response => (
            <Card text={response?.description} hours={HoursFormat(response?.time)} createdAt={response?.createdAt} id={response._id} key={response._id}/>
          ))}
        </div>
      )}
      {loading && (
        <div className="h-96 w-3/6 flex justify-center items-center">
          <Loader2 className="text-white w-56 animate-spin"/>
        </div>
      )}
      <Modal />
    </main>
  )
}
