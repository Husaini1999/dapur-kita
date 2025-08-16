import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, MessageCircle } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Ahmad Rahman",
    items: [
      { name: "Nasi Lemak Special", quantity: 2, price: 12.5 },
      { name: "Roti Canai", quantity: 3, price: 3.5 },
    ],
    total: 35.5,
    status: "preparing",
    orderTime: "10:30 AM",
    deliveryTime: "11:15 AM",
    address: "Jalan Ampang, KL",
    phone: "+60 12-345 6789",
    notes: "Extra spicy sambal please",
  },
  {
    id: "ORD-002",
    customerName: "Siti Nurhaliza",
    items: [{ name: "Rendang Daging", quantity: 1, price: 18.0 }],
    total: 18.0,
    status: "ready",
    orderTime: "11:00 AM",
    deliveryTime: "11:45 AM",
    address: "Mont Kiara, KL",
    phone: "+60 19-876 5432",
    notes: "",
  },
  {
    id: "ORD-003",
    customerName: "David Lim",
    items: [
      { name: "Char Kway Teow", quantity: 2, price: 10.0 },
      { name: "Roti Canai", quantity: 2, price: 3.5 },
    ],
    total: 27.0,
    status: "delivered",
    orderTime: "9:45 AM",
    deliveryTime: "10:30 AM",
    address: "KLCC, KL",
    phone: "+60 16-234 5678",
    notes: "No prawns in char kway teow",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "preparing":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "ready":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function OrdersOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif font-bold text-3xl text-foreground">Orders Overview</h1>
        <p className="text-muted-foreground">Manage your incoming orders and track deliveries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-lg">3</div>
                <div className="text-xs text-muted-foreground">Preparing</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-lg">2</div>
                <div className="text-xs text-muted-foreground">Ready</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-lg">12</div>
                <div className="text-xs text-muted-foreground">Delivered Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">RM</span>
              </div>
              <div>
                <div className="font-semibold text-lg">RM 450</div>
                <div className="text-xs text-muted-foreground">Today's Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <Badge variant="secondary" className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">RM {order.total.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{order.orderTime}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{order.address}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{order.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Order Items:</div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>RM {(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Special Notes */}
              {order.notes && (
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="font-medium text-sm mb-1">Special Instructions:</div>
                  <div className="text-sm text-muted-foreground">{order.notes}</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm text-muted-foreground">Expected delivery: {order.deliveryTime}</div>
                <div className="flex space-x-2">
                  {order.status === "preparing" && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Mark as Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Mark as Delivered
                    </Button>
                  )}
                  {order.status === "delivered" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
