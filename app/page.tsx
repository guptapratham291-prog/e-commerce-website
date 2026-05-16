'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
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
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,#2874F0_0%,#6A5AF9_100%)] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),transparent_20%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,56,0.12),transparent_40%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-8"
          >
            <Badge className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-white/90">
              Premium Launch
            </Badge>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Elevate every moment with modern essentials.
            </h1>

            <p className="max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
              Discover bold silhouettes, expressive color, and gallery-grade products built for an elevated everyday wardrobe.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="h-14 rounded-full bg-white text-slate-950 shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-100">
                  Shop Bestsellers
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/30 text-white hover:border-white">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Fast Delivery</p>
                <p className="mt-3 text-xl font-semibold">Free shipping on orders over $100</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Best Rated</p>
                <p className="mt-3 text-xl font-semibold">4.9 average customer reviews</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-[2rem] bg-white/10 p-6">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80"
                  alt="Product showcase"
                  width={740}
                  height={760}
                  className="h-[420px] w-full rounded-[1.75rem] object-cover shadow-2xl shadow-slate-950/20"
                />
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm">
                  <FiShoppingCart className="inline-block mr-2 h-4 w-4" /> Best Seller
                </div>
                <div className="absolute bottom-6 left-6 rounded-3xl bg-slate-900/80 px-4 py-3 text-white shadow-xl">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-200/80">Featured</p>
                  <p className="mt-2 text-lg font-semibold">Audiophile Headphones</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

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
