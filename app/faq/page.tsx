"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ShoppingCart,
  Truck,
  RotateCcw,
  CreditCard,
  Shield,
  HelpCircle,
  MessageSquare,
} from "lucide-react"

const faqCategories = [
  {
    id: "orders",
    name: "Orders & Shipping",
    icon: Truck,
    faqs: [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order by logging into your account and visiting the 'My Orders' section. You'll find real-time tracking information for all your orders. You can also use the tracking number sent to your email to track directly on our shipping partner's website.",
      },
      {
        question: "What are the shipping options?",
        answer:
          "We offer several shipping options: Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Next Day Delivery (available in select areas). Shipping costs vary based on your location and order size. Orders over $50 qualify for free standard shipping.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship to over 25 countries worldwide. International shipping times vary by destination, typically ranging from 7-21 business days. Import duties and taxes may apply depending on your country's regulations.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "You can modify your shipping address within 1 hour of placing your order. After that, please contact our customer support team immediately. If the order hasn't been shipped yet, we'll do our best to update the address.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    icon: RotateCcw,
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. Some items like personalized products, intimate apparel, and clearance items may not be eligible for return.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "To start a return, log into your account, go to 'My Orders', select the order containing the item you wish to return, and click 'Return Item'. Follow the prompts to generate a return shipping label. You can also contact our customer support for assistance.",
      },
      {
        question: "How long does it take to receive a refund?",
        answer:
          "Once we receive your returned item, refunds are processed within 3-5 business days. The refund will be credited to your original payment method. Bank processing times may add an additional 5-10 business days.",
      },
      {
        question: "Do you offer exchanges?",
        answer:
          "Yes, we offer exchanges for items of equal or lesser value. If you'd like to exchange for a higher-priced item, you can return the original item for a refund and place a new order, or pay the difference during the exchange process.",
      },
    ],
  },
  {
    id: "payment",
    name: "Payment & Billing",
    icon: CreditCard,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For larger orders, we also offer financing options through Affirm.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers - it's processed securely through our payment partners.",
      },
      {
        question: "Can I use multiple payment methods for one order?",
        answer:
          "Currently, we support one payment method per order. However, you can combine a gift card with another payment method - the gift card balance will be applied first, and the remaining amount charged to your selected payment method.",
      },
      {
        question: "Do you offer price matching?",
        answer:
          "Yes, we offer price matching for identical items sold by authorized retailers. If you find a lower price within 14 days of purchase, contact us with proof of the lower price and we'll refund the difference.",
      },
    ],
  },
  {
    id: "account",
    name: "Account & Security",
    icon: Shield,
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' in the top right corner of our website. You can register using your email address or sign up quickly with Google or Facebook. Creating an account lets you track orders, save favorites, and checkout faster.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click 'Sign In' then 'Forgot Password'. Enter your email address and we'll send you a secure link to reset your password. The link expires after 24 hours for security purposes.",
      },
      {
        question: "How can I update my account information?",
        answer:
          "Log into your account and go to 'Profile Settings'. From there, you can update your name, email, phone number, shipping addresses, and payment methods. Some changes may require email verification.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "If you wish to delete your account, please contact our customer support team. Note that account deletion is permanent and you'll lose access to your order history, saved items, and any loyalty points.",
      },
    ],
  },
  {
    id: "products",
    name: "Products & Inventory",
    icon: ShoppingCart,
    faqs: [
      {
        question: "How do I know if an item is in stock?",
        answer:
          "Stock availability is shown on each product page. If an item is out of stock, you can click 'Notify Me' to receive an email when it becomes available again.",
      },
      {
        question: "Are your products authentic?",
        answer:
          "Yes, we only sell 100% authentic products sourced directly from manufacturers or authorized distributors. We guarantee the authenticity of every item we sell.",
      },
      {
        question: "Can I get a product that's out of stock?",
        answer:
          "Sign up for back-in-stock notifications and we'll email you when the item becomes available. For high-demand items, we recommend acting quickly as they may sell out again.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer:
          "Yes! During checkout, you can select gift wrapping for a small additional fee. You can also include a personalized gift message. Gift-wrapped items are shipped in discreet packaging with no pricing information included.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const allFaqs = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ ...faq, categoryId: category.id }))
  )

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeCategory === "all" || faq.categoryId === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find quick answers to common questions about orders, shipping,
              returns, and more.
            </p>

            {/* Search */}
            <div className="relative mt-8">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="h-12 pl-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <Badge
              variant={activeCategory === "all" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setActiveCategory("all")}
            >
              All Topics
            </Badge>
            {faqCategories.map((category) => (
              <Badge
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon className="mr-1 h-3 w-3" />
                {category.name}
              </Badge>
            ))}
          </div>

          {/* FAQ List */}
          {searchQuery || activeCategory !== "all" ? (
            // Filtered results
            <div className="mx-auto max-w-3xl">
              {filteredFaqs.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">
                      No results found
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Try adjusting your search or browse all categories
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveCategory("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="rounded-lg border bg-card px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          ) : (
            // Categorized view
            <div className="mx-auto max-w-3xl space-y-12">
              {faqCategories.map((category) => (
                <div key={category.id}>
                  <div className="mb-4 flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                  </div>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.id}-${index}`}
                        className="rounded-lg border bg-card px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Still Need Help?</h2>
            <p className="mt-2 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Our support team is
              ready to assist you.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline">Start Live Chat</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
