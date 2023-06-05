"use client";

import loginBackGround from "../../../public/loginbackgroud.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterUser } from "@/services/api";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  function handleRegister(data : any) {
    RegisterUser(data)
    router.push('/')
  }

  return (
    <main className="flex h-screen justify-center items-center">
      <form
        className="flex flex-col gap-3 p-2 items-center h-screen w-full lg:p-4 lg:gap-5 bg-white rounded-lg lg:w-3/4 lg:h-5/6"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Image
          src={loginBackGround}
          alt="loginbackground"
          className="rounded-full w-32 h-32"
        />

        <div className="flex flex-col lg:flex-row gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="firstName">Firstname</label>
          <input
            className="border-slate-950 border-2 rounded-md p-2 text-center"
            type="text"
            placeholder="John"
            id="firstName"
            {...register("firstName")}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="texlastNamet">Lastname</label>
          <input
            className="border-slate-950 border-2 rounded-md p-2 text-center"
            type="text"
            placeholder="Doe"
            id="lastName"
            {...register("lastName")}
          />
        </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border-slate-950 border-2 rounded-md p-2 text-center"
            type="text"
            placeholder="JohnDoe@mail.com"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-3 lg:flex-row w-full ">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="age">Age</label>
            <input
              className="border-slate-950 border-2 rounded-md p-2 text-center"
              type="number"
              placeholder="22"
              id="age"
              {...register("age")}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="border-slate-950 border-2 rounded-md p-2 text-center"
              type="text"
              placeholder="(99) 99999-9999"
              id="phoneNumber"
              {...register("phoneNumber")}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              className="border-slate-950 border-2 rounded-md p-2 text-center"
              type="password"
              placeholder="*********"
              id="password"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="border-slate-950 border-2 rounded-md p-2 text-center"
              type="password"
              placeholder="*********"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <button className="bg-cardbg text-white w-full p-2 border-0 rounded-md hover:brightness-125">
            Registrar
          </button>
          <a className="w-full p-2 hover:bg-slate-300 text-center" href="/">
            Login
          </a>
        </div>
      </form>
    </main>
  );
}
