import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Briefcase, DollarSign, Clock, Tag } from 'lucide-react'
import OnboardingDialog from '@/components/OnBoardingDialog'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { formatBudget, timeAgo } from '@/lib/helper'
import { fetchJobs } from '@/redux/slices/jobSlice'

export default function JobListingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All")
  const [budgetRange, setBudgetRange] = useState([0, 10000])

  const dispatch = useAppDispatch()
  const { jobs, isLoading } = useAppSelector(state => state.jobs)
  
  useEffect(() => {
    dispatch(fetchJobs())
  },[dispatch])


  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === "All" || job.category === category) &&
    (parseInt(formatBudget(job.budget)) >= budgetRange[0] &&
    parseInt(formatBudget(job.budget)) <= budgetRange[1])
  )

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Jobs</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Writing">Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Budget Range (ICP)</label>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={budgetRange}
                  onValueChange={setBudgetRange}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span>{budgetRange[0]} ICP</span>
                  <span>{budgetRange[1]} ICP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <Badge variant="secondary">{job.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {job.budget.toString()} ICP
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {timeAgo(job.datePosted)}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job.bids.length} proposals
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to={`/job/${job.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <OnboardingDialog/>
    </div>
  )
}