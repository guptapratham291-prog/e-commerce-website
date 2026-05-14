"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { mockOrders } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
  Phone,
  Mail,
} from "lucide-react"

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: Clock,
    step: 1,
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: Package,
    step: 2,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    icon: Truck,
    step: 3,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle2,
    step: 4,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: XCircle,
    step: 0,
  },
}

const trackingSteps = [
  { status: "pending", label: "Order Placed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "delivered", label: "Delivered" },
]

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { isAuthenticated } = useAuthStore()
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    notFound()
  }

  const status = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <Package className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Sign in to view order</h1>
            <p className="mt-2 text-muted-foreground">
              Please login to view order details
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
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>

        {/* Order Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>
              <Badge className={status.color}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {status.label}
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex gap-2">
            {order.status === "delivered" && (
              <Button variant="outline">Download Invoice</Button>
            )}
            {(order.status === "pending" || order.status === "processing") && (
              <Button variant="destructive">Cancel Order</Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Tracking */}
            {order.status !== "cancelled" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="flex justify-between">
                      {trackingSteps.map((step, index) => {
                        const isCompleted = status.step > index
                        const isCurrent = status.step === index + 1
                        return (
                          <div
                            key={step.status}
                            className="flex flex-1 flex-col items-center"
                          >
                            <div
                              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                                isCompleted || isCurrent
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/30 bg-background text-muted-foreground"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <span className="text-sm font-medium">
                                  {index + 1}
                                </span>
                              )}
                            </div>
                            <span
                              className={`mt-2 text-center text-xs sm:text-sm ${
                                isCompleted || isCurrent
                                  ? "font-medium text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    {/* Progress Line */}
                    <div className="absolute left-0 top-5 h-0.5 w-full -translate-y-1/2">
                      <div className="h-full bg-muted-foreground/30" />
                      <div
                        className="absolute left-0 top-0 h-full bg-primary transition-all"
                        style={{
                          width: `${((status.step - 1) / 3) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  {order.status === "shipped" && (
                    <div className="mt-6 rounded-lg bg-muted p-4">
                      <p className="text-sm font-medium">Tracking Number</p>
                      <p className="mt-1 font-mono text-lg">TRK-{order.id}-2024</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-lg border p-4"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <Link
                          href={`/products/${item.productId}`}
                          className="font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Price: ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-lg font-bold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(order.total - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Included</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.shippingAddress.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.country}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {order.shippingAddress.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {order.shippingAddress.email}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Credit Card</p>
                <p className="text-sm text-muted-foreground">
                  **** **** **** 4242
                </p>
              </CardContent>
            </Card>

            {/* Need Help? */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium">Need Help?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  If you have any questions about your order, please contact our
                  support team.
                </p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
