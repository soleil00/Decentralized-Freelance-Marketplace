import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'

export default function HomeNavbar() {
    const {} = useAppSelector(state => state.auth)
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">DFM</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link to="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About Us
            </Link>
              <Button asChild>
                  <Link to="/jobs">Get Started</Link>
                </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/how-it-works">How It Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/features">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login">Log In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
