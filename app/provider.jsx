"use client"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Provider({ children }) {

   const { user}=useUser();
   const [userDetail, setUserDetail]=useState();
   const [SelectedChapterIndex, setSelectedChapterIndex] = useState(0);
   useEffect(() => {
    user && CreateNewUser();
   }, [user])

  const CreateNewUser = async()=>{
   const result = await axios.post('/api/user',{
    name:user?.fullName,
    email:user?.primaryEmailAddress?.emailAddress
   });
   console.log(result.data);
   setUserDetail(result.data);
  }
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider value={{SelectedChapterIndex, setSelectedChapterIndex}}>
       <div> {children} </div> 
    </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
   
  )
}

export default Provider
