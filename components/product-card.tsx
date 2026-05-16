'use client'

import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Product, useCartStore, useWishlistStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Plus, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
  featured?: boolean
}

export function ProductCard({ product, className, featured }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        'group block transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl',
        className
      )}
    >
      <div className="relative">
        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-secondary/50',
            featured ? 'aspect-[3/4]' : 'aspect-square',
            'rounded-xl'
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-accent text-accent-foreground shadow-sm">
                {discount}% Off
              </Badge>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="secondary" className="shadow-sm">
                Low Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              'absolute right-3 top-3 h-10 w-10 rounded-full shadow-md transition-all duration-300',
              'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
              inWishlist && 'opacity-100 translate-y-0 bg-accent text-accent-foreground'
            )}
            onClick={handleWishlistToggle}
          >
            <Heart className={cn('h-4 w-4', inWishlist && 'fill-current')} />
          </Button>

          {/* Quick Add Button */}
          <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              className="w-full gap-2 rounded-lg shadow-lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <Plus className="h-4 w-4" />
              {product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          {/* Category */}
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="font-medium leading-tight text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(product.rating)
                      ? 'fill-foreground text-foreground'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
