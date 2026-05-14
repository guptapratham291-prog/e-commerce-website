'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore, useAuthStore, useOrdersStore, Order } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CreditCard,
  Lock,
  ShoppingBag,
  Tag,
  Truck,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const { addOrder } = useOrdersStore()

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [billingInfo, setBillingInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  })

  const [shippingInfo, setShippingInfo] = useState({
    sameAsBilling: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  })

  const [paymentMethod, setPaymentMethod] = useState('card')

  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Add some items to your cart before checking out.
            </p>
            <Link href="/products">
              <Button className="mt-6">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h2 className="mt-6 text-3xl font-bold">Order Confirmed!</h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="mt-6 rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-lg font-semibold">{orderId}</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A confirmation email has been sent to {billingInfo.email}
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/orders">
                <Button variant="outline">View Orders</Button>
              </Link>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      const newOrderId = `ORD-${Date.now()}`
      const order: Order = {
        id: newOrderId,
        date: new Date().toISOString(),
        items: items,
        total: total,
        status: 'pending',
        paymentStatus: 'paid',
        shippingAddress: {
          id: 1,
          name: shippingInfo.sameAsBilling
            ? `${billingInfo.firstName} ${billingInfo.lastName}`
            : `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          street: shippingInfo.sameAsBilling ? billingInfo.address : shippingInfo.address,
          city: shippingInfo.sameAsBilling ? billingInfo.city : shippingInfo.city,
          state: shippingInfo.sameAsBilling ? billingInfo.state : shippingInfo.state,
          zip: shippingInfo.sameAsBilling ? billingInfo.zip : shippingInfo.zip,
          country: shippingInfo.sameAsBilling ? billingInfo.country : shippingInfo.country,
        },
      }

      addOrder(order)
      clearCart()
      setOrderId(newOrderId)
      setOrderComplete(true)
      setIsProcessing(false)
      toast.success('Order placed successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          {/* Progress Steps */}
          <div className="mt-6 flex items-center gap-4">
            {['Billing', 'Shipping', 'Payment'].map((label, index) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step > index + 1
                      ? 'bg-success text-success-foreground'
                      : step === index + 1
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span
                  className={`hidden text-sm sm:inline ${
                    step >= index + 1 ? 'font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
                {index < 2 && (
                  <div
                    className={`h-px w-8 sm:w-16 ${
                      step > index + 1 ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Cart
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7">
            {/* Step 1: Billing Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={billingInfo.firstName}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, firstName: e.target.value })
                        }
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={billingInfo.lastName}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, lastName: e.target.value })
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, email: e.target.value })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, phone: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={billingInfo.address}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, address: e.target.value })
                      }
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={billingInfo.city}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, city: e.target.value })
                        }
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={billingInfo.state}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, state: e.target.value })
                        }
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={billingInfo.zip}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, zip: e.target.value })
                        }
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={billingInfo.country}
                      onValueChange={(value) =>
                        setBillingInfo({ ...billingInfo, country: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setStep(2)}>
                    Continue to Shipping
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsBilling"
                      checked={shippingInfo.sameAsBilling}
                      onCheckedChange={(checked) =>
                        setShippingInfo({
                          ...shippingInfo,
                          sameAsBilling: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="sameAsBilling">Same as billing address</Label>
                  </div>

                  {!shippingInfo.sameAsBilling && (
                    <>
                      <Separator />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="shipFirstName">First Name</Label>
                          <Input
                            id="shipFirstName"
                            value={shippingInfo.firstName}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipLastName">Last Name</Label>
                          <Input
                            id="shipLastName"
                            value={shippingInfo.lastName}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shipAddress">Address</Label>
                        <Input
                          id="shipAddress"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="shipCity">City</Label>
                          <Input
                            id="shipCity"
                            value={shippingInfo.city}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, city: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipState">State</Label>
                          <Input
                            id="shipState"
                            value={shippingInfo.state}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, state: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipZip">ZIP Code</Label>
                          <Input
                            id="shipZip"
                            value={shippingInfo.zip}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, zip: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shipCountry">Country</Label>
                        <Select
                          value={shippingInfo.country}
                          onValueChange={(value) =>
                            setShippingInfo({ ...shippingInfo, country: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex flex-1 cursor-pointer items-center gap-2">
                        <span className="font-bold text-blue-600">Pay</span>
                        <span className="font-bold text-blue-800">Pal</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <>
                      <Separator />
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items Preview */}
                <div className="max-h-60 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="self-center font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Coupon */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Coupon code" className="pl-10" />
                  </div>
                  <Button variant="outline">Apply</Button>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Shipping Notice */}
                <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {shipping === 0
                      ? 'Free shipping on this order!'
                      : 'Estimated delivery: 3-5 business days'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
