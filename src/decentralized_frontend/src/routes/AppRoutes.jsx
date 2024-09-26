
import {Routes,Route} from "react-router-dom"


import React from 'react'
import HomePage from "../pages/Homepage"
import JobListingsPage from "@/pages/Jobs"
import RootLayout from "@/layouts/AppLayout"
import DashboardPage from "@/pages/MyDashboard"
import JobDetailPage from "@/pages/JobDetails"
import MessagesPage from "@/pages/ChatPage"
import PostJobPage from "@/pages/PostJobPage"

const AppRoutes = () => {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<RootLayout/>} >
            <Route index element={<JobListingsPage />} />
            <Route path="my-listings" element={<DashboardPage />} />
            <Route path="details" element={<JobDetailPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="post-job" element={<PostJobPage />} />
          </Route>

        </Routes>
      </>
  )
}

export default AppRoutes