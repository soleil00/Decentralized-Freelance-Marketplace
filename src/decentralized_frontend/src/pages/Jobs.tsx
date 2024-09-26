import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Briefcase, DollarSign, Clock, Tag } from 'lucide-react'
import OnboardingDialog from '@/components/OnBoardingDialog'

// Mock data for job listings
const jobListings = [
  {
    id: '1',
    title: "Smart Contract Developer",
    description: "We're seeking an experienced Solidity developer to create and audit smart contracts for our DeFi project.",
    budget: "5000-10000 ICP",
    skills: ["Solidity", "Ethereum", "Smart Contracts"],
    postedDate: "2 days ago",
    proposals: 8,
    category: "Blockchain"
  },
  {
    id: '2',
    title: "UI/UX Designer for Web3 Application",
    description: "Design an intuitive and engaging user interface for our decentralized marketplace application.",
    budget: "3000-6000 ICP",
    skills: ["UI/UX", "Figma", "Web3"],
    postedDate: "1 week ago",
    proposals: 15,
    category: "Design"
  },
  {
    id: '3',
    title: "Content Writer for Blockchain Blog",
    description: "Create engaging and informative content about blockchain technology, cryptocurrencies, and decentralized applications.",
    budget: "500-1000 ICP per article",
    skills: ["Content Writing", "Blockchain Knowledge", "SEO"],
    postedDate: "3 days ago",
    proposals: 12,
    category: "Writing"
  },
]

export default function JobListingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All")
  const [budgetRange, setBudgetRange] = useState([0, 10000])

  const filteredJobs = jobListings.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === "All" || job.category === category) &&
    (parseInt(job.budget.split('-')[0]) >= budgetRange[0] &&
    parseInt(job.budget.split('-')[1]) <= budgetRange[1])
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
                      {job.budget} ICP
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {job.postedDate}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job.proposals} proposals
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