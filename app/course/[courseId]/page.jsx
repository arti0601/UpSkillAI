 
 "use client"
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'
import AppHeader from '@/app/workspace/_components/AppHeader'
 
 function Course() {
  // const { courseId} = useParams();
  const params = useParams();
const courseId = params?.courseId;

  const [courseInfo,setCourseInfo]=useState();
  //   useEffect(() => {
  //   GetEnrolledCourseById();
  // }, [])
  useEffect(() => {
  if (courseId) {
    GetEnrolledCourseById();
  }
}, [courseId]); // 👈 also update the dependency array


  const GetEnrolledCourseById = async () => {
      const result = await axios.get('/api/enroll-course?courseId='+courseId);
      console.log(result.data);
      setCourseInfo(result.data);
  }

   return (
     <div>
       <AppHeader hideSidebar={true}/>
       <div className='flex gap-10'>
       < ChapterListSidebar courseInfo={courseInfo}/>
       <ChapterContent courseInfo={courseInfo} refreshData={() => GetEnrolledCourseById()}/>
       </div>
     </div>
   )
 }
 
 export default Course
 