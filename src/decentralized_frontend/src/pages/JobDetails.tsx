import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, Clock, User } from 'lucide-react'

const jobDetail = {
  id: '1',
  title: "Smart Contract Developer Needed",
  description: "We're looking for an experienced Solidity developer to create and audit smart contracts for our DeFi project. The ideal candidate should have a strong understanding of blockchain technology and experience with Ethereum smart contract development.",
  budget: "5000-10000 ICP",
  duration: "2-3 months",
  skills: ["Solidity", "Ethereum", "Smart Contracts", "DeFi"],
  postedBy: "BlockchainCo",
  postedDate: "2023-07-01"
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [bidAmount, setBidAmount] = useState('')
  const [proposal, setProposal] = useState('')

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting bid:', { amount: bidAmount, proposal })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{jobDetail.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {jobDetail.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{jobDetail.description}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Budget: {jobDetail.budget}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Duration: {jobDetail.duration}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Posted by: {jobDetail.postedBy}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Posted on: {jobDetail.postedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Submit a Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitBid}>
            <div className="space-y-4">
              <div>
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">Bid Amount (ICP)</label>
                <Input
                  id="bidAmount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  required
                />
              </div>
              <div>
                <label htmlFor="proposal" className="block text-sm font-medium text-gray-700">Proposal</label>
                <Textarea
                  id="proposal"
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Describe why you're the best fit for this job"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="mt-4">Submit Proposal</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}