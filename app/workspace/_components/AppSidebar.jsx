'use client';
 import React from 'react'
 import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image  from "next/image"
import { Button } from '@/components/ui/button'
import { BookOpen, Bot, Compass, CreditCard, LayoutDashboard, User } from 'lucide-react'
import Link from 'next/link' 

import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog'

const SideBarOptions=[
  {
   title:'Dashboard',
   icon:LayoutDashboard,
   path:'/workspace/#'
},
{
   title:'My Learning',
   icon:BookOpen,
   path:'/workspace/my-learning'
},
{
   title:'Explore Courses',
   icon:Compass,
   path:'/workspace/explore'
},
{
   title:'AI Tools',
   icon:Bot,
   path:'/#'
},
{
   title:'Billing',
   icon:CreditCard,
   path:'/workspace/billing'
},
{
   title:'Profile',
   icon:User,
   path:'/workspace/profile'
}

]
 function AppSidebar() {

  const path=usePathname();

   return (
      <Sidebar>
      <SidebarHeader className="p-4">
  <div className="flex items-center gap-3">
    <Image
  src="/initiative.png"
  alt="logo"
  width={40}
  height={40}
  className="invert brightness-0"
/>

    <span className="text-orange-800 font-bold text-xl">UPSKILL</span>
  </div>
</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
             <Button className={'btn-glow-gradient relative overflow-hidden flex items-center gap-1'}>+ Create New Course</Button>
          </AddNewCourseDialog>
         
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index)=>(
                <SidebarMenuItem key={index}>
                 <SidebarMenuButton asChild className={'p-5'}>
                    <Link href={item.path} className={`text-[17px] ${path.includes(item.path)&& 'text-primary bg-orange-50'}`}>
                    <item.icon className='h-7 w-7'/>
                    <span>{item.title}</span>
                    </Link>
                 </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
   )
 }
 
 export default AppSidebar
 