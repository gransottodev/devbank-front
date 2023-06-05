import axios from "axios";
const url = 'https://devbank.onrender.com'

interface RegisterProps{
  firstName: string;
	lastName: string;
	email: string;
	age: number;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
}

async function RegisterUser(data: RegisterProps) {
  const result = await axios.post(`${url}/v1/user/register`, data)

  return result
}

async function SignInRequest(email : string, password: string) {
  const result = await axios.post(`${url}/v1/user/login`, {
    email,
    password
  })

  return result.data
}

async function GetByToken(token: string) {
  const result = await axios.get(`${url}/v1/user`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return result.data
} 

async function GetCounters(token: string){
  const result = await axios.get(`${url}/v1/mycounters`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return result.data
}

async function GetCounter(id: string, token: string) {
  const result = await axios.get(`${url}/v1/counter/${id}`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return result.data
}

async function SaveCounter(id : string, time : number, token : string) {

  const result = await axios.put(`${url}/v1/counter`, {
    id, 
    time
    },{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
  return result.data
}

async function CreateCount(id: string, description : string, token : string) {
  const result = await axios.post(`${url}/v1/counter`, {
    id,
    description
  }, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return result
}

async function DeleteCount(countID: string, token: string) {

  const data = {id : countID}
  const response = await axios.delete(`${url}/v1/counter`, {
    data,
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return response
}


export { SignInRequest, GetByToken, GetCounters, GetCounter, SaveCounter, CreateCount, DeleteCount, RegisterUser}