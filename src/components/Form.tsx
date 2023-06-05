"use client"

import Image from "next/image";
import loginBackGround from "../../public/loginbackgroud.jpg";
import { useForm } from 'react-hook-form'
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";


export function Form() {

  const { SignIn } = useContext(AuthContext)
  async function handleSingIn(data : any) {
    await SignIn(data)
  }

  const {register, handleSubmit} = useForm()
  return (
    <form
      className="flex flex-col items-center h-screen w-full p-4 gap-5 bg-white rounded-lg lg:w-96 lg:h-5/6"
      onSubmit={handleSubmit(handleSingIn)}
    >
      <Image
        src={loginBackGround}
        alt="loginbackground"
        className="rounded-full w-40 h-40"
      />
      {/* <div className="w-40 h-40 bg-slate-600 rounded-full"></div> */}

      <div className="flex flex-col gap-2 w-full mt-12">
        <label htmlFor="email">Email</label>
        <input
          className="border-slate-950 border-2 rounded-md p-2 text-center"
          type="text"
          placeholder="JohnDoe@mail.com"
          id="email"
          {...register('email')}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="password">Password</label>
        <input
          className="border-slate-950 border-2 rounded-md p-2 text-center"
          type="password"
          placeholder="*********"
          id="password"
          {...register('password')}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <button className="bg-cardbg text-white w-full p-2 border-0 rounded-md hover:brightness-125">
          SingIn
        </button>
        <a
          className="w-full p-2 hover:bg-slate-300 text-center"
          href="/register"
        >
          Register
        </a>
      </div>
    </form>
  );
}
