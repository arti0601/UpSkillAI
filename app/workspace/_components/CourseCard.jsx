 'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // ✅ You were using <Link> without importing it properly
import axios from 'axios';
import { toast } from 'sonner';

function CourseCard({ course }) { 
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading]=useState(false);
  const onEnrollCourse = async()=>{
    try{
    const result = await axios.post('/api/enroll-course', {
    courseId: course?.cid
    });
    console.log(result.data);
    if(result.data.resp){
      toast.warning('Already Enrolled!');
      setLoading(false);
      return;
    }
    toast.success('Enrolled!')
    setLoading(false);
  }
  catch(e){
    toast.error('Server side error')
    setLoading(false);
  }
  
  }
  return (
    <div className="shadow rounded-xl">
      {/* ✅ Only render Image if src exists */}
      {course?.bannerImageUrl && (
        <Image
          src={course.bannerImageUrl}
          alt={courseJson?.name || "Course Banner"}
          width={400}
          height={300}
          className="w-full aspect-video rounded-t-xl object-cover"
        />
      )}

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-4 text-gray-500 text-sm">{courseJson?.description}</p>

        <div className="flex justify-between items-center">
          <h2 className="flex items-center text-sm gap-2">
            <Book className="text-primary h-5 w-5" />
            {courseJson?.noOfChapters || 0} Chapters
          </h2>

          {course?.courseContent?.length ? (
            // <Button size="sm" 
            //       onClick={onEnrollCourse}
            //       disabled={loading}  >
            //  {loading?<LoaderCircle  className='animate-spin'/>: <PlayCircle className="h-4 w-4 mr-1" />}
            //   Enroll Course
            // </Button>
              <Button
  size="sm"
  onClick={onEnrollCourse}
  disabled={loading}
  className="btn-glow-gradient relative overflow-hidden flex items-center gap-1"
>
  {loading ? (
    <LoaderCircle className="animate-spin h-4 w-4" />
  ) : (
    <>
      <PlayCircle className="h-4 w-4" />
      Enroll Course
    </>
  )}
</Button>


          ) : (
            <Link href={`/workspace/edit-course/${course?.cid}`}>
              {/* <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Generate Course
              </Button> */}
              <Button size="sm" variant="outline" className="btn-glow-gradient flex items-center gap-1">
              <Settings className="h-4 w-4" />
                 Generate Course
                 </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

