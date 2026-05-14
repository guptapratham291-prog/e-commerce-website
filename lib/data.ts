import { Product } from './store'

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation, 40-hour battery life, and premium comfort.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&q=80',
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 2547,
    stock: 50,
    specifications: {
      'Driver Size': '40mm',
      'Battery Life': '40 hours',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g',
    },
    featured: true,
    trending: true,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    description: 'Stay connected and track your fitness with our advanced smartwatch featuring health monitoring, GPS, and 7-day battery life.',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80',
    ],
    category: 'Electronics',
    rating: 4.6,
    reviews: 1823,
    stock: 35,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '50m',
      'Sensors': 'Heart rate, SpO2, GPS',
    },
    featured: true,
  },
  {
    id: 3,
    name: 'Minimalist Leather Backpack',
    description: 'Crafted from premium full-grain leather, this minimalist backpack combines style with functionality for the modern professional.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'Fashion',
    rating: 4.9,
    reviews: 892,
    stock: 20,
    specifications: {
      'Material': 'Full-grain leather',
      'Capacity': '20L',
      'Laptop Size': 'Up to 15"',
      'Dimensions': '45x30x15cm',
    },
    featured: true,
    trending: true,
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    description: 'Ultra-soft organic cotton t-shirt with a relaxed fit. Sustainably made with eco-friendly dyes.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'Fashion',
    rating: 4.5,
    reviews: 3421,
    stock: 150,
    trending: true,
  },
  {
    id: 5,
    name: 'Professional Camera Lens',
    description: '50mm f/1.4 prime lens perfect for portraits and low-light photography with stunning bokeh.',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&q=80',
    category: 'Electronics',
    rating: 4.9,
    reviews: 567,
    stock: 15,
    specifications: {
      'Focal Length': '50mm',
      'Aperture': 'f/1.4',
      'Mount': 'Universal',
      'Weight': '410g',
    },
  },
  {
    id: 6,
    name: 'Ceramic Pour-Over Coffee Set',
    description: 'Handcrafted ceramic pour-over set for the perfect cup of coffee. Includes dripper, carafe, and filters.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    category: 'Home',
    rating: 4.7,
    reviews: 1245,
    stock: 45,
    featured: true,
  },
  {
    id: 7,
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back.',
    price: 549.99,
    originalPrice: 699.99,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80',
    category: 'Home',
    rating: 4.6,
    reviews: 2134,
    stock: 25,
    specifications: {
      'Material': 'Mesh & Aluminum',
      'Max Weight': '150kg',
      'Adjustments': '12-point',
      'Warranty': '5 years',
    },
    trending: true,
  },
  {
    id: 8,
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek aluminum design.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500&q=80',
    category: 'Electronics',
    rating: 4.4,
    reviews: 3876,
    stock: 200,
  },
  {
    id: 9,
    name: 'Yoga Mat Premium',
    description: 'Extra thick eco-friendly yoga mat with alignment lines. Non-slip surface for all yoga styles.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    category: 'Sports',
    rating: 4.8,
    reviews: 1567,
    stock: 80,
    specifications: {
      'Thickness': '6mm',
      'Material': 'Natural rubber',
      'Dimensions': '183x68cm',
      'Features': 'Alignment lines',
    },
  },
  {
    id: 10,
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled vacuum insulated bottle keeps drinks cold 24h or hot 12h. BPA-free.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    category: 'Sports',
    rating: 4.7,
    reviews: 4523,
    stock: 300,
    trending: true,
  },
  {
    id: 11,
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with RGB backlighting, hot-swappable switches, and aluminum frame.',
    price: 169.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    category: 'Electronics',
    rating: 4.8,
    reviews: 2891,
    stock: 60,
    specifications: {
      'Switches': 'Cherry MX',
      'Layout': 'Full-size',
      'Connectivity': 'USB-C / Wireless',
      'Features': 'RGB, Hot-swap',
    },
    featured: true,
  },
  {
    id: 12,
    name: 'Scented Candle Set',
    description: 'Set of 3 hand-poured soy candles with natural essential oils. 45-hour burn time each.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1602607375398-6e76e72c9146?w=500&q=80',
    category: 'Home',
    rating: 4.6,
    reviews: 1234,
    stock: 90,
  },
  {
    id: 13,
    name: 'Running Shoes Pro',
    description: 'Lightweight performance running shoes with responsive cushioning and breathable mesh upper.',
    price: 159.99,
    originalPrice: 189.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Sports',
    rating: 4.7,
    reviews: 3456,
    stock: 75,
    specifications: {
      'Weight': '220g',
      'Drop': '8mm',
      'Cushioning': 'React foam',
      'Upper': 'Flyknit mesh',
    },
    trending: true,
  },
  {
    id: 14,
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound, 20-hour battery, and built-in microphone.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    category: 'Electronics',
    rating: 4.5,
    reviews: 2678,
    stock: 110,
  },
  {
    id: 15,
    name: 'Linen Bed Sheet Set',
    description: 'Luxurious 100% French linen bed sheet set. Softens with every wash. Includes fitted sheet, flat sheet, and pillowcases.',
    price: 249.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80',
    category: 'Home',
    rating: 4.9,
    reviews: 876,
    stock: 30,
    featured: true,
  },
  {
    id: 16,
    name: 'Sunglasses Classic',
    description: 'Timeless aviator sunglasses with polarized lenses and titanium frame. UV400 protection.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    category: 'Fashion',
    rating: 4.6,
    reviews: 1987,
    stock: 65,
    specifications: {
      'Frame': 'Titanium',
      'Lens': 'Polarized',
      'Protection': 'UV400',
      'Style': 'Aviator',
    },
  },
]

export const categories = [
  { name: 'Electronics', slug: 'electronics', icon: '📱', count: 156 },
  { name: 'Fashion', slug: 'fashion', icon: '👕', count: 243 },
  { name: 'Home', slug: 'home', icon: '🏠', count: 189 },
  { name: 'Sports', slug: 'sports', icon: '⚽', count: 127 },
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    content: 'Absolutely love the quality of products here! Fast shipping and excellent customer service. Will definitely be ordering again.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    content: 'The wireless headphones are incredible. Sound quality is top-notch and the noise cancellation is perfect for my commute.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    content: 'Great selection and competitive prices. The leather backpack I ordered exceeded my expectations in terms of quality.',
    rating: 4,
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.trending)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
  )
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
