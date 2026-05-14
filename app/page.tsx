import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product-card'
import {
  products,
  categories,
  testimonials,
  getFeaturedProducts,
  getTrendingProducts,
} from '@/lib/data'
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% protected',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day guarantee',
  },
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'Curated selection',
  },
]

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const trendingProducts = getTrendingProducts()

  return (
    <div className="flex flex-col">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-6 animate-fade-in border-foreground/20 text-foreground/70">
              New Season 2024
            </Badge>
            
            <h1 className="animate-slide-up font-serif text-5xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="text-balance">Curated elegance for</span>{' '}
              <span className="italic">modern living</span>
            </h1>
            
            <p className="mt-6 max-w-lg animate-slide-up text-lg leading-relaxed text-muted-foreground stagger-1">
              Discover our thoughtfully curated collection of premium products, 
              designed to elevate your everyday experience.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-slide-up stagger-2">
              <Link href="/products">
                <Button size="lg" className="h-14 gap-3 rounded-full px-8 text-base">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-base">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex items-center gap-8 animate-slide-up stagger-3 sm:gap-12">
              <div>
                <p className="font-serif text-4xl font-medium text-foreground">50K+</p>
                <p className="mt-1 text-sm text-muted-foreground">Happy customers</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="font-serif text-4xl font-medium text-foreground">10K+</p>
                <p className="mt-1 text-sm text-muted-foreground">Premium products</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="font-serif text-4xl font-medium text-foreground">4.9</p>
                <p className="mt-1 text-sm text-muted-foreground">Average rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="h-12 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`flex items-center gap-4 animate-slide-up stagger-${index + 1}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground/5">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Bento Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                Shop by Category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Explore our curated collections
              </p>
            </div>
            <Link 
              href="/products" 
              className="link-underline flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid auto-rows-[280px] grid-cols-2 gap-4 sm:auto-rows-[320px] lg:grid-cols-4">
            {categories.slice(0, 4).map((category, index) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/60" />
                <Image
                  src={
                    index === 0
                      ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
                      : index === 1
                      ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
                      : index === 2
                      ? 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80'
                      : 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80'
                  }
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                    {category.count} Products
                  </p>
                  <h3 className="mt-1 text-xl font-medium text-white sm:text-2xl">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Badge variant="outline" className="mb-3">Handpicked</Badge>
              <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our most loved pieces this season
              </p>
            </div>
            <Link 
              href="/products" 
              className="link-underline flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80"
                alt="Pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-20">
              <div className="flex flex-col justify-center">
                <Badge variant="secondary" className="mb-4 w-fit bg-primary-foreground/10 text-primary-foreground">
                  Limited Time
                </Badge>
                <h2 className="font-serif text-3xl font-medium text-primary-foreground sm:text-4xl lg:text-5xl">
                  Up to 50% Off <br />
                  <span className="italic">Electronics</span>
                </h2>
                <p className="mt-4 max-w-md text-primary-foreground/70">
                  Upgrade your tech with our biggest sale of the year. Premium gadgets at unbeatable prices.
                </p>
                <Link href="/products?category=electronics" className="mt-8">
                  <Button variant="secondary" size="lg" className="gap-2 rounded-full">
                    Shop the Sale
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-center">
                <div className="relative h-80 w-80">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
                    alt="Headphones"
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Badge variant="outline" className="mb-3">Popular Now</Badge>
              <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                Trending This Week
              </h2>
              <p className="mt-2 text-muted-foreground">
                {"What's"} catching everyone&apos;s eye
              </p>
            </div>
            <Link 
              href="/products" 
              className="link-underline flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Testimonials
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="hover-lift rounded-2xl border bg-card p-8"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'fill-foreground text-foreground'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Badge variant="outline" className="mb-3">Just In</Badge>
              <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fresh additions to our collection
              </p>
            </div>
            <Link 
              href="/products" 
              className="link-underline flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-muted-foreground">
            Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border bg-transparent px-6 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" size="lg" className="h-12 rounded-full px-8">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </section>
    </div>
  )
}
