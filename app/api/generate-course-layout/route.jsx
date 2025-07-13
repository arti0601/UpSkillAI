 import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const PROMPT= `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt
(Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course)
for Course Banner in 3d format

Chapter Name, Topic under each chapters, Duration for each chapters etc, in JSON format only
Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}
, User Input:`

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  const {courseId,...formData} = await req.json();
  const user=await currentUser();
  //here adding something
  const {has } = await auth()
  const hasPremiumAccess = has({ plan: 'starter' })
 

  const tools = [{ googleSearch: {} }];
  const config = {
    tools,
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [{
    role: 'user',
    parts: [{ text: PROMPT+JSON.stringify(formData) }],
  }];

   //if user already created any course?
    if(!hasPremiumAccess){
      const result = await db.select().from(coursesTable)
     .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress));

     if(result?.length>=1){
      return NextResponse.json({'resp':'limit exceed'})
     }
    }


  const response = await ai.models.generateContent({
     model,
     config,
      contents,
     });
  const RawResp=response?.candidates[0]?.content?.parts[0]?.text;
  const RawJson = RawResp.replace('```json', '').replace('```','');

  const JSONResp=JSON.parse(RawJson);
  const ImagePrompt=JSONResp.course?.bannerImagePrompt;

  const bannerImageUrl= await GenerateImage(ImagePrompt);

  await db.insert(coursesTable).values({
    ...formData,
    courseJson: JSONResp,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl: bannerImageUrl,
  });

  return NextResponse.json({ courseId: courseId });
}

const GenerateImage = async (ImagePrompt) => {
  const BASE_URL='https://aigurulab.tech';
  const result = await axios.post(BASE_URL+'/api/generate-image',
    {
      width: 1024,
      height: 1024,
      input: ImagePrompt,
      model: 'flux',
      aspectRatio:"16:9"
    },
    {
      headers: {
        'x-api-key':process?.env?.AI_GURU_LAB_API,
        'Content-Type': 'application/json',
      },
    });

  return result.data.image;
};
