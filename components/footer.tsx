import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Electronics', href: '/products?category=electronics' },
    { label: 'Fashion', href: '/products?category=fashion' },
    { label: 'Home & Living', href: '/products?category=home' },
    { label: 'Sports', href: '/products?category=sports' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Press', href: '/about' },
    { label: 'Blog', href: '/about' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Info', href: '/faq' },
    { label: 'Returns', href: '/faq' },
    { label: 'Track Order', href: '/orders' },
    { label: 'Size Guide', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/faq' },
    { label: 'Terms of Service', href: '/faq' },
    { label: 'Cookie Policy', href: '/faq' },
    { label: 'Accessibility', href: '/faq' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Brand & Newsletter */}
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-tight">
                LUXE
              </span>
            </Link>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Curated elegance for modern living. Discover premium products designed 
              to elevate your everyday experience.
            </p>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-sm font-medium uppercase tracking-widest">
                Join Our Newsletter
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Be the first to know about new collections and exclusive offers.
              </p>
              <form className="mt-4 flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-11 rounded-full px-5"
                />
                <Button className="h-11 rounded-full px-6">
                  <Mail className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-all hover:border-foreground hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest">Shop</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest">Company</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest">Support</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest">Legal</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:hello@luxe.com" className="flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" />
              hello@luxe.com
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4" />
              (123) 456-7890
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">We Accept</span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-card text-xs font-bold">
                VISA
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-card text-xs font-bold">
                MC
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-card text-xs font-bold">
                AMEX
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
