"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products, mockOrders, mockUsers } from "@/lib/data"
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  Eye,
} from "lucide-react"

export default function AdminAnalyticsPage() {
  // Calculate analytics data
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = mockOrders.length
  const totalCustomers = mockUsers.filter((u) => u.role === "user").length
  const avgOrderValue = totalRevenue / totalOrders

  // Sales by category
  const salesByCategory = [
    { name: "Electronics", sales: 45000, percentage: 35 },
    { name: "Clothing", sales: 32000, percentage: 25 },
    { name: "Home & Garden", sales: 25000, percentage: 20 },
    { name: "Sports", sales: 15000, percentage: 12 },
    { name: "Other", sales: 10000, percentage: 8 },
  ]

  // Monthly sales data
  const monthlySales = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 19000 },
    { month: "Jun", sales: 25000 },
  ]

  // Top products
  const topProducts = products.slice(0, 5).map((product, index) => ({
    ...product,
    sold: Math.floor(Math.random() * 100 + 50),
    revenue: (product.salePrice || product.price) * (Math.floor(Math.random() * 100 + 50)),
  }))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your store performance and insights
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="mt-1 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Order Value
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
            <div className="mt-1 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +4.3% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="mt-1 flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlySales.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="w-10 text-sm text-muted-foreground">
                    {month.month}
                  </span>
                  <div className="flex-1">
                    <div className="h-4 rounded-full bg-muted">
                      <div
                        className="h-4 rounded-full bg-primary"
                        style={{
                          width: `${(month.sales / 25000) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="w-20 text-right text-sm font-medium">
                    ${(month.sales / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByCategory.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{category.name}</span>
                    <span className="font-medium">
                      ${(category.sales / 1000).toFixed(0)}K ({category.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 text-right font-medium">Units Sold</th>
                  <th className="pb-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topProducts.map((product, index) => (
                  <tr key={product.id} className="text-sm">
                    <td className="py-3 font-medium">{index + 1}</td>
                    <td className="py-3">
                      <div className="font-medium line-clamp-1">
                        {product.name}
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="py-3 text-right">{product.sold}</td>
                    <td className="py-3 text-right font-medium">
                      ${product.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">124,892</p>
                <p className="mt-1 text-xs text-green-500">+18.2% vs last week</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Eye className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">3.24%</p>
                <p className="mt-1 text-xs text-green-500">+0.5% vs last week</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold">42.8%</p>
                <p className="mt-1 text-xs text-red-500">+2.1% vs last week</p>
              </div>
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                <TrendingUp className="h-5 w-5 rotate-180 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
