import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Truck,
  Shield,
  HeadphonesIcon,
  Award,
  Users,
  Target,
  Heart,
} from "lucide-react"

const stats = [
  { label: "Happy Customers", value: "50K+" },
  { label: "Products Sold", value: "100K+" },
  { label: "Years in Business", value: "10+" },
  { label: "Countries Shipped", value: "25+" },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Everything we do starts with our customers. Their satisfaction is our top priority.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "We carefully curate every product to ensure it meets our high standards.",
  },
  {
    icon: Target,
    title: "Innovation",
    description:
      "We constantly evolve and improve to bring you the best shopping experience.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in building lasting relationships with our customers and partners.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Emily Davis",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    name: "David Kim",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About ShopHub
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              We&apos;re on a mission to make online shopping accessible,
              enjoyable, and trustworthy for everyone. Founded in 2014, we&apos;ve
              grown from a small startup to a trusted destination for millions
              of customers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  ShopHub started with a simple idea: create an online shopping
                  experience that feels personal, trustworthy, and enjoyable.
                  Our founders, frustrated with impersonal e-commerce
                  experiences, set out to build something better.
                </p>
                <p>
                  What began in a small garage has grown into a global platform
                  serving customers in over 25 countries. But despite our
                  growth, we&apos;ve never lost sight of what matters most -
                  our customers.
                </p>
                <p>
                  Today, we continue to innovate and improve, always putting
                  the customer experience first. From our carefully curated
                  product selection to our dedicated customer support team,
                  every decision we make is guided by our commitment to you.
                </p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Our team at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="mt-4 text-muted-foreground">
              These core values guide everything we do at ShopHub
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="mt-4 text-muted-foreground">
              The passionate people behind ShopHub
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="mt-4 text-muted-foreground">
              We go above and beyond to ensure your satisfaction
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Free Shipping</h3>
              <p className="mt-2 text-muted-foreground">
                Free shipping on orders over $50. Fast and reliable delivery
                worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Secure Payments</h3>
              <p className="mt-2 text-muted-foreground">
                Your payment information is always safe with our encrypted
                checkout.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <HeadphonesIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">24/7 Support</h3>
              <p className="mt-2 text-muted-foreground">
                Our friendly support team is always here to help you with any
                questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Award className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-3xl font-bold">Join Our Community</h2>
            <p className="mt-4 text-muted-foreground">
              Be part of our growing family of satisfied customers and enjoy
              exclusive benefits.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
