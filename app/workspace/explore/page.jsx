"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
 
 function Explore() {
  const [courseList, setCourseList] = useState([]);
    const { user } = useUser();
     useEffect(() =>{
      user && GetCourseList();
     }, [ user ])
  const GetCourseList = async()=>{
    const result = await axios.get('/api/courses?courseId=0');
    console.log(result.data);
    setCourseList(result.data)
  }
   return (
     <div>
        <h2 className='font-bold text-3xl mb-6 '>Explore Courses</h2>
        <div className='flex gap-5 max-w-md p-6'>
        <Input placeholder='Search' />
        <Button className={'btn-glow-gradient relative overflow-hidden flex items-center gap-1'}> <Search /> Search </Button>

   
        </div>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'> 
       {courseList?.map((course, index)=>(
        <CourseCard course={course} key={index} />
       ))}
     </div> 

        
     </div>
   )
 }
 
 export default Explore
 