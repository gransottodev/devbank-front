"use client";

import "./style.module.css";
import ReactModal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { parseCookies } from "nookies";
import { CreateCount } from "@/services/api";
import {useForm} from 'react-hook-form'

export default function Modal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState('')
  const {"bank.Token": token} = parseCookies()
  const { handleSubmit } = useForm()
  const {user} = useContext(AuthContext)

  useEffect(() => {
    window.addEventListener('openModal', () => {
      setModalOpen(true)
    })
  })

  function closeModal() {
    setModalOpen(false);
  }

  function handleChangeDescription(e : any){
    setDescription(e.target.value)
  }

  function createCount(){
    CreateCount(user._id, description, token).then(() => {
      window.location.reload()
    })
    setModalOpen(false)
  }

  return (
    <>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="flex justify-center items-center h-screen"
      >
        <form onSubmit={handleSubmit(createCount)} className="flex flex-col h-screen w-full items-center justify-evenly lg:w-3/4 lg:h-3/4 bg-white p-5 rounded-xl relative">
          <h1 className="text-xl lg:text-3xl text-infocard">Criando Novo Contador!</h1>
          <XCircle
            onClick={closeModal}
            className="cursor-pointer text-red-700 absolute top-6 right-5"
          />

          <div className="flex flex-col w-72 justify-between gap-y-20 lg:w-3/5 mt-10">
            <input
              onChange={event => handleChangeDescription(event)}
              id="description"
              className="border-2 border-darkbg rounded-md p-2 text-center"
              type="text"
              placeholder="Como devemos chamar?"
            />

            <button
            onClick={createCount} className="bg-darkbg text-white p-2 rounded-lg border-0 uppercase hover:scale-105 transition-all ease-in">Criar Contador!</button>
          </div>
        </form>
      </ReactModal>
    </>
  );
}
