"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuthStore, useCartStore, useWishlistStore } from "@/lib/store"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ShoppingBag,
} from "lucide-react"
import { toast } from "sonner"

export default function WishlistPage() {
  const { isAuthenticated } = useAuthStore()
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const wishlistProducts = wishlistItems
    .map((item) => products.find((p) => p.id === item.productId))
    .filter(Boolean)

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images[0],
        quantity: 1,
      })
      toast.success("Added to cart!")
    }
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
    toast.success("Removed from wishlist")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Sign in to view wishlist</h1>
            <p className="mt-2 text-muted-foreground">
              Please login to view your saved items
            </p>
            <Button asChild className="mt-6">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="mt-2 text-muted-foreground">
            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 text-muted-foreground">
                Save items you love by clicking the heart icon
              </p>
              <Button asChild className="mt-6">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => {
              if (!product) return null
              const discount = product.salePrice
                ? Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )
                : 0

              return (
                <Card
                  key={product.id}
                  className="group overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    {discount > 0 && (
                      <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
                        -{discount}%
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <Badge variant="secondary" className="text-lg">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-3 top-3"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="line-clamp-2 font-semibold transition-colors hover:text-primary">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold">
                            ${product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button
                      className="mt-4 w-full"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Recommendations */}
        {wishlistProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter(
                  (p) => !wishlistItems.some((item) => item.productId === p.id)
                )
                .slice(0, 4)
                .map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <CardContent className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="line-clamp-1 font-semibold transition-colors hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-2 flex items-center gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="font-bold">
                              ${product.salePrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
