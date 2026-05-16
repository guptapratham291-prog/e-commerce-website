import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-[150px] font-bold leading-none text-primary/10 sm:text-[200px]">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 sm:-mt-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Page Not Found</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Oops! The page you&apos;re looking for seems to have wandered off.
            Don&apos;t worry, it happens to the best of us.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Helpful Action */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to home
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            Here are some helpful links:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-primary hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-primary hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-primary hover:underline"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
