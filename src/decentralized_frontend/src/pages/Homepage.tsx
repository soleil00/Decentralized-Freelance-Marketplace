import HomeNavbar from "@/components/HomeNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, Lock, Zap, Code, Users, GraduationCap, Coins } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1">
        <section className="w-full mx-auto py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Connect with Rwanda's Top Web3 Talent
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Empowering Rwanda's blockchain ecosystem through our decentralized freelancing platform on the Internet Computer Protocol
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link to="/jobs">Hire Developers</Link>
                </Button>
                <Button variant="outline">Join as a Developer</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Rwanda's Web3 Talent?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <Code className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Emerging Tech Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Access Rwanda's growing pool of skilled blockchain and web3 developers.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Cultural Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Benefit from diverse perspectives in your blockchain projects.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <GraduationCap className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Continuous Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Tap into a workforce eager to learn and adapt to new blockchain technologies.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Coins className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Cost-Effective</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Get quality web3 development at competitive rates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tackling Web3 Challenges in Rwanda</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're addressing the unique challenges of the Rwandan web3 ecosystem to connect you with the best talent.
                </p>
              </div>
              <div className="space-y-4">
                <ul className="grid gap-4 list-disc list-inside">
                  <li className="text-xl font-semibold">Bridging the skills gap through targeted training programs</li>
                  <li className="text-xl font-semibold">Facilitating knowledge transfer between global and local developers</li>
                  <li className="text-xl font-semibold">Providing resources for continuous learning in blockchain technologies</li>
                  <li className="text-xl font-semibold">Creating opportunities for practical experience in real-world projects</li>
                  <li className="text-xl font-semibold">Building a supportive community for Rwanda's web3 developers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Tap into Rwanda's Web3 Potential?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our decentralized freelance marketplace today and be part of Rwanda's blockchain revolution.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button asChild className="w-full">
                  <Link to="/sign-up">Sign Up Now</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/learn-more">Learn About Rwanda's Tech Scene</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 Rwanda Web3 Freelance Marketplace. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}