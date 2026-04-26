import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { Solution } from "@/components/solution"
import { Features } from "@/components/features"
import { Security } from "@/components/security"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Security />
      <CTA />
      <Footer />
    </main>
  )
}
