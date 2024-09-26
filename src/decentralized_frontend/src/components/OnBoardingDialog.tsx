

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon } from 'lucide-react'

export default function OnboardingDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState('')
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    const firstTime = localStorage.getItem('firstTime')
    if (firstTime === null) {
      setIsOpen(true)
    }
  }, [])

  const handleStartExploring = () => {
    localStorage.setItem('firstTime', 'false')
    setIsOpen(false)
  }

  const steps = [
    {
      title: "Welcome to DecentralFreelance",
      description: "Let's get you set up in just a few quick steps!",
      content: (
        <Button onClick={() => setStep(1)} className="mt-4">Get Started</Button>
      )
    },
    {
      title: "Are you a freelancer or a client?",
      description: "We'll tailor your experience based on your role.",
      content: (
        <RadioGroup className="mt-4" onValueChange={(value) => setUserType(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="freelancer" id="freelancer" />
            <Label htmlFor="freelancer">Freelancer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="client" />
            <Label htmlFor="client">Client</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: userType === 'freelancer' ? "What skills do you offer?" : "What services are you looking for?",
      description: "Select all that apply.",
      content: (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {['Web Development', 'Design', 'Writing', 'Marketing', 'Mobile Development', 'Data Analysis'].map((skill) => (
            <Button
              key={skill}
              variant={interests.includes(skill) ? "default" : "outline"}
              className="justify-start"
              onClick={() => setInterests(prev => 
                prev.includes(skill) ? prev.filter(i => i !== skill) : [...prev, skill]
              )}
            >
              <CheckIcon className={`mr-2 h-4 w-4 ${interests.includes(skill) ? 'opacity-100' : 'opacity-0'}`} />
              {skill}
            </Button>
          ))}
        </div>
      )
    },
    {
      title: "You're all set!",
      description: `Welcome to DecentralFreelance, ${userType === 'freelancer' ? 'freelancer' : 'client'}!`,
      content: (
        <div className="mt-4">
          <p className="mb-4">You're interested in: {interests.join(', ')}</p>
          <Button onClick={handleStartExploring}>Start Exploring</Button>
        </div>
      )
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>{steps[step].title}</CardTitle>
            <CardDescription>{steps[step].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {steps[step].content}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(prev => prev - 1)}>Back</Button>
            )}
            {step < steps.length - 1 && step > 0 && (
              <Button onClick={() => setStep(prev => prev + 1)} disabled={step === 1 && !userType || step === 2 && interests.length === 0}>Next</Button>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}