import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { postJob } from '@/redux/slices/jobSlice'

export default function PostJobPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.jobs)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [duration, setDuration] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim() !== '') {
      e.preventDefault()
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const jobData = {
    title,
    description,
    category,
    budget: BigInt(budgetMax),
    duration,
    skills,
    employer: 'Current User',
  };

  try {
    await dispatch(postJob(jobData)).unwrap();
    navigate('/jobs/my-listings');
  } catch (error) {
    console.error('Failed to post job:', error);
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the job requirements and expectations"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select job category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blockchain">Blockchain Development</SelectItem>
                  <SelectItem value="web3">Web3</SelectItem>
                  <SelectItem value="smartContract">Smart Contract</SelectItem>
                  <SelectItem value="frontend">Frontend Development</SelectItem>
                  <SelectItem value="backend">Backend Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="writing">Content Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budgetMin">Minimum Budget (ICP)</Label>
                <Input
                  id="budgetMin"
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="Minimum budget"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetMax">Maximum Budget (ICP)</Label>
                <Input
                  id="budgetMax"
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="Maximum budget"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Project Duration</Label>
              <Select onValueChange={setDuration} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select project duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lessThanWeek">Less than a week</SelectItem>
                  <SelectItem value="oneToTwoWeeks">1 - 2 weeks</SelectItem>
                  <SelectItem value="twoToFourWeeks">2 - 4 weeks</SelectItem>
                  <SelectItem value="oneToThreeMonths">1 - 3 months</SelectItem>
                  <SelectItem value="threeToSixMonths">3 - 6 months</SelectItem>
                  <SelectItem value="moreThanSixMonths">More than 6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                id="skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Posting...' : 'Post Job'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}