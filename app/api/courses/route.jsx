import { db } from "@/config/db";
import { coursesTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { asc, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { sql } from 'drizzle-orm';

 
 
 export async function GET(req){
  
  const {searchParams}=new URL(req.url);
  const courseId=searchParams?.get('courseId')
  const user = await currentUser();

  //new one
  if(courseId == 0){
    const result=await db.select().from(coursesTable)
    .where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`);

  console.log(result);
  return NextResponse.json(result); // ✅ return full list

  }

  //new end here 
  if(courseId)
  {
  const result=await db.select().from(coursesTable).where(eq(coursesTable.cid,courseId));

  console.log(result);
   return NextResponse.json(result[0]);
  }
  else{
   const result=await db.select().from(coursesTable).where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
  .orderBy(asc(coursesTable.id));
   

  console.log(result);
   return NextResponse.json(result);
  }
 }