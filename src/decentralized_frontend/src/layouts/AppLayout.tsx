import React from 'react'
import { Outlet } from 'react-router-dom'
import '../index.css'
import Header from '@/components/Header'

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}