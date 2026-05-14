'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuthStore, Address } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  Shield,
  Package,
  Heart,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Camera,
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

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, updateUser, logout } = useAuthStore()

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  })

  if (!isAuthenticated || !user) {
    router.push('/login')
    return null
  }

  const handleSaveProfile = () => {
    updateUser(editedUser)
    setIsEditing(false)
    toast.success('Profile updated successfully')
  }

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city) {
      toast.error('Please fill in all required fields')
      return
    }

    const address: Address = {
      id: Date.now(),
      name: newAddress.name!,
      street: newAddress.street!,
      city: newAddress.city!,
      state: newAddress.state || '',
      zip: newAddress.zip || '',
      country: newAddress.country || 'United States',
      isDefault: (user.addresses?.length || 0) === 0,
    }

    updateUser({
      addresses: [...(user.addresses || []), address],
    })

    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
    })

    toast.success('Address added successfully')
  }

  const handleDeleteAddress = (addressId: number) => {
    updateUser({
      addresses: user.addresses?.filter((a) => a.id !== addressId),
    })
    toast.success('Address deleted')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('Logged out successfully')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your profile, addresses, and account settings
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="h-24 w-24 overflow-hidden rounded-full bg-muted">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-muted-foreground">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/orders">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/wishlist">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </a>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="addresses">
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="name"
                            value={isEditing ? editedUser.name : user.name}
                            onChange={(e) =>
                              setEditedUser({ ...editedUser, name: e.target.value })
                            }
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={isEditing ? editedUser.email : user.email}
                            onChange={(e) =>
                              setEditedUser({ ...editedUser, email: e.target.value })
                            }
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={isEditing ? editedUser.phone : user.phone || ''}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, phone: e.target.value })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false)
                            setEditedUser({
                              name: user.name,
                              email: user.email,
                              phone: user.phone || '',
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>Manage your delivery addresses</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Address</DialogTitle>
                          <DialogDescription>
                            Enter the details for your new address
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="addressName">Address Label</Label>
                            <Input
                              id="addressName"
                              placeholder="Home, Office, etc."
                              value={newAddress.name}
                              onChange={(e) =>
                                setNewAddress({ ...newAddress, name: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              placeholder="123 Main St"
                              value={newAddress.street}
                              onChange={(e) =>
                                setNewAddress({ ...newAddress, street: e.target.value })
                              }
                            />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="New York"
                                value={newAddress.city}
                                onChange={(e) =>
                                  setNewAddress({ ...newAddress, city: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                placeholder="NY"
                                value={newAddress.state}
                                onChange={(e) =>
                                  setNewAddress({ ...newAddress, state: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input
                                id="zip"
                                placeholder="10001"
                                value={newAddress.zip}
                                onChange={(e) =>
                                  setNewAddress({ ...newAddress, zip: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="country">Country</Label>
                              <Select
                                value={newAddress.country}
                                onValueChange={(value) =>
                                  setNewAddress({ ...newAddress, country: value })
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
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddAddress}>Add Address</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {user.addresses.map((address) => (
                          <Card key={address.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{address.name}</h4>
                                    {address.isDefault && (
                                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {address.street}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {address.city}, {address.state} {address.zip}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {address.country}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteAddress(address.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No addresses saved</h3>
                        <p className="mt-2 text-muted-foreground">
                          Add an address to make checkout faster
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium">Change Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure
                      </p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                          <Input id="confirmNewPassword" type="password" className="mt-1" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about orders, promotions, and updates
                        </p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
