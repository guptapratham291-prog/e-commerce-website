"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products, mockOrders, mockUsers } from "@/lib/data"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
} from "lucide-react"

export default function AdminDashboard() {
  // Calculate stats
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = mockOrders.length
  const totalProducts = products.length
  const totalCustomers = mockUsers.filter((u) => u.role === "user").length

  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length
  const processingOrders = mockOrders.filter(
    (o) => o.status === "processing"
  ).length

  const recentOrders = mockOrders.slice(0, 5)

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: totalProducts.toString(),
      change: "+3.1%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Total Customers",
      value: totalCustomers.toString(),
      change: "-2.4%",
      trend: "down",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingOrders > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-yellow-500 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  >
                    {pendingOrders}
                  </Badge>
                  <span className="text-sm">Pending orders awaiting review</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/orders?status=pending">
                    View
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
            {processingOrders > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {processingOrders}
                  </Badge>
                  <span className="text-sm">Orders being processed</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/orders?status=processing">
                    View
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
            {products.filter((p) => !p.inStock).length > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-red-500 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  >
                    {products.filter((p) => !p.inStock).length}
                  </Badge>
                  <span className="text-sm">Products out of stock</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/products?stock=out">
                    View
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/products/new">
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/orders">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Orders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/customers">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/orders">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order) => {
                  const customer = mockUsers.find((u) => u.id === order.userId)
                  return (
                    <tr key={order.id} className="text-sm">
                      <td className="py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-medium hover:underline"
                        >
                          #{order.id}
                        </Link>
                      </td>
                      <td className="py-3">{customer?.name || "Unknown"}</td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className={
                            order.status === "delivered"
                              ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20"
                              : order.status === "shipped"
                                ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20"
                                : order.status === "processing"
                                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                                  : order.status === "cancelled"
                                    ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20"
                                    : "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3">{order.items.length} items</td>
                      <td className="py-3 text-right font-medium">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Products</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/products">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(product.salePrice || product.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 50 + 10)} sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
