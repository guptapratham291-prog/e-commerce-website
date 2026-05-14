'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById, getRelatedProducts } from '@/lib/data'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = getProductById(Number(id))

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product)
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const inWishlist = isInWishlist(product.id)
  const images = product.images || [product.image]
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    window.location.href = '/checkout'
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/products?category=${product.category.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="truncate font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                  -{discount}%
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all',
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.name}</h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(product.rating)
                          ? 'fill-warning text-warning'
                          : 'text-muted-foreground'
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <Badge variant="secondary" className="text-success">
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="mt-4">
                {product.stock > 10 ? (
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-warning">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Only {product.stock} left in stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-destructive">
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <p className="text-muted-foreground">{product.description}</p>

              <Separator className="my-6" />

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center rounded-lg border">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="flex-1"
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={cn(inWishlist && 'border-accent text-accent')}
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="mt-2 text-xs font-medium">Free Shipping</span>
                  <span className="text-xs text-muted-foreground">On orders $50+</span>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="mt-2 text-xs font-medium">Warranty</span>
                  <span className="text-xs text-muted-foreground">2 Year Coverage</span>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <span className="mt-2 text-xs font-medium">Easy Returns</span>
                  <span className="text-xs text-muted-foreground">30 Day Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-16">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p className="mt-4 text-muted-foreground">
                Experience premium quality with our {product.name}. Designed with attention to detail
                and crafted from the finest materials, this product delivers exceptional performance
                and style. Perfect for everyday use, it combines functionality with aesthetics to
                enhance your lifestyle.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            {product.specifications ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between rounded-lg border p-4"
                  >
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No specifications available for this product.
              </p>
            )}
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-5xl font-bold">{product.rating}</p>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < Math.floor(product.rating)
                          ? 'fill-warning text-warning'
                          : 'text-muted-foreground'
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.reviews.toLocaleString()} reviews
                </p>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground">
              Customer reviews feature coming soon. Check back later for detailed reviews and ratings.
            </p>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
