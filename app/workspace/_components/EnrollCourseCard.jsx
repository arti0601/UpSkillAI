 import React from 'react'
 import Image from 'next/image'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
 
//  function EnrollCourseCard( course, enrollCourse) {
//   const courseJson = course?.courseJson?.course;
function EnrollCourseCard({ course, enrollCourse }) {
  const courseJson = course?.courseJson?.course;

  const CalculatePerProgress = () => {
    return (enrollCourse?.completedChapters?.length ?? 0 /course?.courseContent?.length)*100
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
        <p className="line-clamp-3 text-gray-500 text-sm">{courseJson?.description}</p>

        <div className="">
          <h2 className='flex justify-between text-sm text-primary'>Progress <span>{CalculatePerProgress()}%</span></h2>
          <Progress value={CalculatePerProgress()}/>
           
          <Link href={'/workspace/view-course/'+course?.cid}>
           <Button className={'w-full mt-3 btn-glow-gradient relative overflow-hidden flex items-center gap-1'}><PlayCircle /> Continue Learning </Button>
           </Link>
        </div>
      </div>
    </div>
   )
 }
 
 export default EnrollCourseCard
 