  'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const { SelectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const [loading, setLoading] = useState(false);
  const [localCompleted, setLocalCompleted] = useState([]);

  // ✅ Always call hooks before any early returns
  useEffect(() => {
    if (courseInfo?.enrollCourse?.completedChapter) {
      setLocalCompleted(courseInfo.enrollCourse.completedChapter);
    }
  }, [courseInfo]);

  // ✅ Now safely return if data is missing
  if (!courseInfo) return null;

  const { enrollCourse } = courseInfo;
  const courseContent = courseInfo?.courses?.courseContent;
  const videoData = courseContent?.[SelectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[SelectedChapterIndex]?.courseData?.topics;

  const markChapterCompleted = async () => {
    setLoading(true);
    try {
      const updatedChapters = [...localCompleted, SelectedChapterIndex];

      await axios.put('/api/enroll-course', {
        courseId,
        completedChapter: updatedChapters,
      });

      setLocalCompleted(updatedChapters);
      toast.success('Chapter Marked Completed!');
      refreshData();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const markInCompleteChapter = async () => {
    setLoading(true);
    try {
      const updatedChapters = localCompleted.filter(i => i !== SelectedChapterIndex);

      await axios.put('/api/enroll-course', {
        courseId,
        completedChapter: updatedChapters,
      });

      setLocalCompleted(updatedChapters);
      toast.success('Chapter Marked InCompleted!');
      refreshData();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 ml-10 mt-10'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>
          {SelectedChapterIndex + 1}. {courseContent?.[SelectedChapterIndex]?.courseData?.chapterName}
        </h2>

        {!localCompleted.includes(SelectedChapterIndex) ? (
          <Button onClick={markChapterCompleted} disabled={loading}>
            <CheckCircle className="mr-2" />
            {loading ? 'Marking...' : 'Mark as Completed'}
          </Button>
        ) : (
          <Button variant="outline" onClick={markInCompleteChapter} disabled={loading}>
            <X className="mr-2" />
            {loading ? 'Updating...' : 'Mark Incomplete'}
          </Button>
        )}
      </div>

      <h2 className='my-2 font-bold text-lg'>Related Videos</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {videoData?.map((video, index) => index < 2 && (
          <div key={index}>
            <YouTube
              videoId={video?.videoId}
              opts={{
                height: '250',
                width: '400'
              }}
            />
          </div>
        ))}
      </div>

      <div className='mt-5'>
        {topics?.map((topic, index) => (
          <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
            <h2 className='font-bold text-2xl text-primary'>
              {index + 1}. {topic?.topic}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{ lineHeight: '2' }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
