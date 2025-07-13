 "use client"
 import axios from 'axios'
import { index } from 'drizzle-orm/gel-core';
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard';
 
 function EnrollCourseList() {

  const [enrolledCourseList, setEnrolledCourseList]=useState();

  useEffect(() => {
    GetEnrolledCourse();
  }, [])

  const GetEnrolledCourse = async () => {
      const result = await axios.get('/api/enroll-course');
      console.log(result.data);
      setEnrolledCourseList(result.data);
  }
    return  (
     <div className='mt-3'>
       <h2 className='font-bold text-xl'>Continue Learning your Courses</h2>


     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
       {enrolledCourseList?.map((course, index) => (
         <EnrollCourseCard course={course?.courses} enrollCourse={course.enrollCourse} key={index}/>
       ))}
       </div>
     
      </div>
   )
 }
 
 export default EnrollCourseList
 