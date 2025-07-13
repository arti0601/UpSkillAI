 import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

 
 
 const PROMPT = ` Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,
{
  topic:<>,
  content:<>
}
}
: User Input:`



 export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises=courseJson?.chapters?.map(async(chapter)=>{
     const config = {
      // tools,
      responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  // console.log( response.candidates[0].content.parts[0].text);
  const RawResp=response.candidates[0].content.parts[0].text;
  const RawJson = RawResp.replace('```json', '').replace('```','');
  const JSONResp=JSON.parse(RawJson);


  //get youtube video
  const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
  console.log({
    youtubeVideo:youtubeData,
    courseData: JSONResp
  })
 return {
    youtubeVideo:youtubeData,
    courseData: JSONResp
    };
  })

  const CourseContent = await Promise.all(promises)

  //Save to DB
   const dbResp = await db.update(coursesTable).set({
    courseContent:CourseContent
   }).where(eq(coursesTable.cid,courseId));

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent: CourseContent
  })
 }


 const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
 const GetYoutubeVideo = async(topic) => {
    const params={
      part:'snippet',
      q:topic,
      maxResult:4,
      type:'video',
      key: process.env.YOUTUBE_API_KEY //youtube api key
    }
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp= resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach(item=>{
      const data={
        videoId:item.id?.videoId,
        title:item?.snippet?.title
      }
      youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList", youtubeVideoList)
    return youtubeVideoList;
 }