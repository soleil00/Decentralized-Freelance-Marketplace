import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from 'lucide-react'

const jobAds = [
  {
    id: '1',
    title: "Smart Contract Developer Needed",
    status: "Active",
    proposals: 5,
    budget: "5000-10000 ICP",
    postedDate: "2023-07-01"
  },
  {
    id: '2',
    title: "Web3 Frontend Developer",
    status: "Closed",
    proposals: 12,
    budget: "3000-6000 ICP",
    postedDate: "2023-06-15"
  },
  {
    id: '3',
    title: "Blockchain Content Writer",
    status: "Active",
    proposals: 3,
    budget: "500-1000 ICP",
    postedDate: "2023-07-05"
  }
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Job Listings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobAds.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Budget: {job.budget}</p>
              <p className="text-sm text-muted-foreground mb-2">Proposals: {job.proposals}</p>
              <p className="text-sm text-muted-foreground">Posted: {job.postedDate}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link to="/jobs/post-job">Post New Job</Link>
        </Button>
      </div>
    </div>
  )
}