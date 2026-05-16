'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { ProductSkeleton } from '@/components/product-skeleton'
import { products, categories, searchProducts } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Search, SlidersHorizontal, X, Star, Grid3X3, LayoutGrid } from 'lucide-react'

const ITEMS_PER_PAGE = 12

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

const ratingFilters = [4, 3, 2, 1]

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const initialSearch = searchParams.get('search') || ''

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [gridView, setGridView] = useState<'compact' | 'large'>('large')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      result = searchProducts(searchQuery)
    }

    if (selectedCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }

    switch (sortBy) {
      case 'newest':
        result = result.reverse()
        break
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedCategory, sortBy, priceRange, minRating])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortBy('featured')
    setPriceRange([0, 1000])
    setMinRating(0)
    setCurrentPage(1)
  }

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <Label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Search
        </Label>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="h-11 rounded-full pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Category
        </Label>
        <div className="mt-3 space-y-1">
          <button
            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              selectedCategory === ''
                ? 'bg-foreground text-background'
                : 'hover:bg-muted'
            }`}
            onClick={() => {
              setSelectedCategory('')
              setCurrentPage(1)
            }}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-foreground text-background'
                  : 'hover:bg-muted'
              }`}
              onClick={() => {
                setSelectedCategory(category.slug)
                setCurrentPage(1)
              }}
            >
              <span>{category.name}</span>
              <span className="text-xs opacity-60">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Price Range
        </Label>
        <div className="mt-4 px-1">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              setCurrentPage(1)
            }}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-medium">${priceRange[0]}</span>
            <span className="font-medium">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <Label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Minimum Rating
        </Label>
        <div className="mt-3 space-y-2">
          {ratingFilters.map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => {
                  setMinRating(checked ? rating : 0)
                  setCurrentPage(1)
                }}
                className="rounded"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="flex cursor-pointer items-center gap-1.5 text-sm"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < rating
                        ? 'fill-foreground text-foreground'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
                <span className="ml-1 text-muted-foreground">& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full rounded-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Collection
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {selectedCategory 
              ? categories.find(c => c.slug === selectedCategory)?.name || 'Products'
              : 'All Products'
            }
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Discover our curated collection of {filteredProducts.length} premium products, 
            designed to elevate your everyday experience.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Toolbar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 rounded-full lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="h-5 w-5 rounded-full p-0">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="font-serif text-xl">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Results count */}
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} results
                </span>

                {/* Active Filters */}
                <div className="hidden flex-wrap gap-2 sm:flex">
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
                      {categories.find((c) => c.slug === selectedCategory)?.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedCategory('')}
                      />
                    </Badge>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
                      ${priceRange[0]} - ${priceRange[1]}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setPriceRange([0, 1000])}
                      />
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Grid Toggle */}
                <div className="hidden items-center gap-1 rounded-full border p-1 sm:flex">
                  <button
                    className={`rounded-full p-2 transition-colors ${
                      gridView === 'large' ? 'bg-foreground text-background' : 'hover:bg-muted'
                    }`}
                    onClick={() => setGridView('large')}
                    aria-label="Large grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    className={`rounded-full p-2 transition-colors ${
                      gridView === 'compact' ? 'bg-foreground text-background' : 'hover:bg-muted'
                    }`}
                    onClick={() => setGridView('compact')}
                    aria-label="Compact grid view"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] rounded-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductSkeleton count={8} />
            ) : paginatedProducts.length > 0 ? (
              <>
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    gridView === 'compact'
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                      : 'grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1 px-4">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = i + 1
                        return (
                          <button
                            key={i}
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors ${
                              currentPage === pageNum
                                ? 'bg-foreground text-background'
                                : 'hover:bg-muted'
                            }`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium">No products found</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  We couldn&apos;t find any products matching your criteria. Try adjusting your filters.
                </p>
                <Button variant="outline" className="mt-6 rounded-full" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background px-4 py-12">
          <ProductSkeleton count={8} />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  )
}
