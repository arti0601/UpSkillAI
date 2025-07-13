'use client';
import React from 'react'
import WorkspaceProvider from './provider'
 
 function 
 WorkspaceLayout({ children }) {
   return (
       <WorkspaceProvider>
        { children }
      </WorkspaceProvider>
   )
 }
 
 export default 
 WorkspaceLayout
 