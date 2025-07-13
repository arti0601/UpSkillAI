import { Book, Clock, Loader2Icon, PlayCircle, Settings, Settings2, TrendingUp } from 'lucide-react';
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

 
 function CourseInfo({ course, viewCourse }) {
  const courseLayout=course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const GenerateCourseContent=async()=>{
 // call api to generate content

setLoading(true)
try {

     const result = await axios.post('/api/generate-course-content', {
        courseJson: courseLayout,
      courseTitle: course?.name,
      courseId: course?.cid
     });
     console.log(result.data);
     setLoading(false)
     router.replace('/workspace')
     toast.success('Course Generated Successfully!')
  }
  catch(e) {
    console.log(e);
    setLoading(false);
    toast.error("Server Side error, Try Again!")
  }
}
   return (
     <div className='  md:flex gap-5 justify-between p-5 rounded-xl shadow-sm'>
       <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl'>{course?.name }</h2>
        <p className=' text-gray-500'>{courseLayout?.description}</p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow-sm'>
            <Clock className='text-red-500' />
            <section>
              <h2 className='font-bold'>Duration</h2>
              <h2>2 Hours</h2>
            </section>
          </div>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow-sm'>
            <Book className='text-blue-500' />
            <section>
              <h2 className='font-bold'>Chapters</h2>
              <h2>2 Hours</h2>
            </section>
          </div>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow-sm'>
            <TrendingUp className='text-green-500' />
            <section>
              <h2 className='font-bold'>Difficulty level</h2>
              <h2>{course?.level}</h2>
            </section>
          </div>
        </div>

        
      {/* {!viewCourse ? 
       <Button className={'max-w-lg'} onClick={GenerateCourseContent} disabled={loading}>
       {loading ? <Loader2Icon /> : <Settings />} 
       Generate Content </Button>
      :<Link href={'/course/'+course?.cid}> <Button> <PlayCircle/> Continue Learning </Button>
      </Link>
      } */}
     {!viewCourse ? (
  <Button className="max-w-lg" onClick={GenerateCourseContent} disabled={loading}>
    {loading ? <Loader2Icon /> : <Settings />} 
    Generate Content
  </Button>
) : course?.cid ? (
  <Link href={`/course/${course.cid}`}>
    <Button>
      <PlayCircle /> Continue Learning
    </Button>
  </Link>
) : (
  <Button disabled>Invalid Course</Button>
)}



       </div>
       {/* <Image src={course?.bannerImageUrl}
       alt="Course Banner"
       width={300}
       height={400}
       className='w-full mt-5 md:mt-0  object-cover aspect-auto h-[240px] rounded-xl'
       /> */}

 {course?.bannerImageUrl ? (
    <Image
      src={course.bannerImageUrl}
      alt="Course Banner"
      width={300}
      height={300}
      className="w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-xl"
    />
  ) : null}

     </div>
   )
 }
 
 export default CourseInfo
   