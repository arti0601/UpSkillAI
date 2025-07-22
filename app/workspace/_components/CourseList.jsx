 "use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddNewCourseDialog from './AddNewCourseDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';

 function CourseList() {
  const [courseList, setCourseList] = useState([]);
    const { user } = useUser();
     useEffect(() =>{
      user && GetCourseList();
     }, [ user ])
  const GetCourseList = async()=>{
    const result = await axios.get('/api/courses');
    console.log(result.data);
    setCourseList(result.data)
  }
   return (
     <div className='mt-10'>
       <h2 className='font-bold text-3xl p-5'>Course List</h2>

       {courseList?.length == 0 ? <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
        <Image src={'/online-learning.png'} alt='edu' width={80} height={80}/> 
        <h2 className='my-2 text-xl font-bold'>Look like you haven't created any courses yet</h2>  

       <AddNewCourseDialog>
         <Button className={'glow-button text-white font-bold py-2 px-6 rounded-md transition-all duration-300 bg-orange-500 hover:bg-orange-700'}>+ Create your first course</Button> 
       </AddNewCourseDialog>
           
     </div> : 
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'> 
       {courseList?.map((course, index)=>(
        <CourseCard course={course} key={index} />
       ))}
     </div> }
     </div>
   )
 }
 
 export default CourseList
 