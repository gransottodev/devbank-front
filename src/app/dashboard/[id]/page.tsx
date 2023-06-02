"use client";

import { useContext, useEffect, useState } from "react";
import { Play, Pause, XCircle, Save, Loader2} from "lucide-react";
import { parseCookies } from "nookies";
import { usePathname, useRouter } from "next/navigation";
import { Aside } from "@/components/Aside";
import { AuthContext } from "@/context/AuthContext";
import { CounterFormat } from "@/utils/counter-format";
import { GetCounter, SaveCounter } from "@/services/api";
import Modal from "@/components/Modal/Modal";

interface CounterDataProps {
  _id: string;
  userID: string;
  description: string;
  createdAt: string;
  time: number;
}

export default function Page() {
  const { user } = useContext(AuthContext);
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAltered, setIsAltered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [counterData, setCounterData] = useState<CounterDataProps | []>([]);
  const urlParams = usePathname().split("/");
  const route = useRouter();

  const days = CounterFormat(counter).days;
  const hours = CounterFormat(counter).hours;
  const minutes = CounterFormat(counter).minutes;
  const seconds = CounterFormat(counter).remainingSeconds;

  useEffect(() => {
    let timer: any;

    const runCounter = () => {
      setCounter((prevCount) => prevCount + 1);
      timer = setTimeout(runCounter, 1000);
    };

    if (isRunning) {
      timer = setTimeout(runCounter, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setIsAltered(true)
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  function backToHome() {
    route.push("/dashboard");
  }

  function save() {
    const { "bank.Token": token } = parseCookies();
    const id = urlParams[2];
    SaveCounter(id, counter, token).then((response) => {
      console.log(response);
    });
    setIsAltered(false)
  }

  useEffect(() => {
    const id = urlParams[2];
    const { "bank.Token": token } = parseCookies();
    if(!token){
      route.push('/')
      return
    }
    GetCounter(`${id}`, token).then((response) => {
      setCounterData(response.data);
      setCounter(response.data.time);
      setLoading(false)
    });
  }, []);

  return (
    <main className="h-screen flex flex-col lg:flex-row justify-center items-center gap-5">
      <Aside firstName={user?.firstName} lastName={user?.lastName} page=''/>
      <div className="flex flex-col items-center lg:h-96 lg:w-3/5 bg-infocard rounded-xl p-5 relative">
        {!loading && (
          <h1 className="text-4xl">{counterData?.description}</h1>
        )}
        {loading && (
          <Loader2 className="animate-spin"/>
        )}
        {!isRunning && (
          <XCircle
            className="absolute top-6 right-6 text-white cursor-pointer"
            onClick={backToHome}
          />
        )}
        <div className="flex flex-col mt-20 gap-20">
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="text-4xl lg:text-6xl text-zinc-100">{days}</h1>
              <span>Days</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="text-4xl lg:text-6xl text-zinc-100">{hours}</h1>
              <span>Hours</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="text-4xl lg:text-6xl text-zinc-100">{minutes}</h1>
              <span>Minutes</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="text-4xl lg:text-6xl text-zinc-100">{seconds}</h1>
              <span>Seconds</span>
            </div>
          </div>
          <div className="flex gap-20 items-center justify-center">
            {isRunning && (
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
                <Pause className="cursor-pointer" onClick={handlePause} />
              </div>
            )}
            {!isRunning && (
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
                <Play className="cursor-pointer" onClick={handleStart} />
              </div>
            )}
            {!isRunning && isAltered && (
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
                <Save className="cursor-pointer" onClick={save} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal />
    </main>
  );
}
