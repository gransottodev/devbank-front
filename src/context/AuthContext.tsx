"use client"
import { createContext, useEffect, useState } from "react";
import {SignInRequest, GetByToken} from "../services/api";
import { setCookie, parseCookies} from 'nookies'
import {useRouter} from "next/navigation";


type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: number;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  SingIn: (data: SignInData) => Promise<void>;
}

type SignInData = {
  email: string;
  password: string;
}


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }){
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;
  const router = useRouter()

  
  useEffect(() => {
    const {'bank.Token' : token} = parseCookies()

    if(token){
      GetByToken(token).then(response => {
        setUser(response.data);
      })
    }
  }, [])

  async function SignIn({email, password} : SignInData) {
    const {token, user} = await SignInRequest(email,password)

    setCookie(undefined, 'bank.Token', token, {
      maxAge: 60 * 60 * 5 //1 Hour
    })

    setUser(user)
    router.push('/dashboard')
  }


  return(
    <AuthContext.Provider value={{ user, isAuthenticated, SignIn}}>
      { children }
    </AuthContext.Provider>
  )
}
