import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { signIn } from "@/redux/slices/authSlice"

import { Bell, MessageSquare } from 'lucide-react'
import { Link } from "react-router-dom"
import { UserNav } from "./UserNav"

export default function Header() {

  const { status, isLoggedIn } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleSignIn = () => {
    dispatch(signIn())
  }

  return (
    <header className="border-b sticky top-0 bg-background z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">DFM</Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/jobs" className="text-sm font-medium text-muted-foreground hover:text-primary">Find Jobs</Link>
          <Link to="/freelancers" className="text-sm font-medium text-muted-foreground hover:text-primary">Find Freelancers</Link>
          <Link to="/jobs/my-listings" className="text-sm font-medium text-muted-foreground hover:text-primary">Dashboard</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {
            isLoggedIn && <>
            <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={()=>window.location.href="/jobs/messages"}>
            <MessageSquare className="h-5 w-5" />
          </Button></>
          }
          <Input type="search" placeholder="Search..." className="hidden md:block w-[200px]" />
          {
            isLoggedIn? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleSignIn}>Logout</Button>
                <span className="text-sm font-medium text-muted-foreground">{status}</span>
                <UserNav/>
              </div>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleSignIn}>Sign In</Button>
            )
          }
        </div>
      </div>
    </header>
  )
}