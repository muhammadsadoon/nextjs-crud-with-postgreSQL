"use client";
import React, { useEffect, useState } from 'react'

interface States {
  name: string;
  email: string;
  password: string
}

interface DataType extends States {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const Home = () => {
  const [state, setState] = useState<States>({ name: "", email: "", password: "" });
  const [data, setData] = useState<DataType[]>([]);

  const getAllUsers = async () => {
    const res = await ( await fetch("/api/user/get-all")).json()
    if(res) {
      setData(res?.data)
    }
  }

  const handleSubmit = async () => {
    const res = await (await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell server we are sending JSON
      },
      body: JSON.stringify(state)
    })).json();

    console.log("submit data: ", res);
    if(res){
      getAllUsers();
      setState({
        email:"",
        name:"",
        password:""
      })
    }
  }
  
  useEffect(()=>{
    getAllUsers();

  },[]);
  return (
    <div className='p-8'>
      <h1 className='font-bold text-2xl'>API creation with NEXTJS</h1>
      <h3>name:</h3>
      <input className='border-[1px] p-2 rounded-md block' type="text" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
      <h3>email:</h3>
      <input className='border-[1px] p-2 rounded-md block' type="text" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
      <h3>password:</h3>
      <input className='border-[1px] p-2 rounded-md block' type="text" value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} />
      <button type="submit" className='border-[1px] my-2 p-2 cursor-pointer rounded-xl' onClick={handleSubmit}>set data</button>
      <ul className='&li:text-xl'>
        {
          data.map((item, i) => {
            return (
              <li key={item.id}>
                {item.id} {"=>"} {item?.name} - {item?.email}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Home
