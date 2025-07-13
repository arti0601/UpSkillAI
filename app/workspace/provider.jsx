 'use client';
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { SidebarProvider } from '@/components/ui/sidebar';


 function WorkspaceProvider({children}) {
   return (
    <SidebarProvider>
      <AppSidebar />
   
       <div className='w-full'> 
        <AppHeader />
        
        <div className='p-10'>
         { children }
        </div>
       
        </div>
    </SidebarProvider>
    
   )

 }
 
 export default WorkspaceProvider
