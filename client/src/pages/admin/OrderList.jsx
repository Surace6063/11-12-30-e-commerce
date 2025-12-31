import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { Eye } from 'lucide-react';

/* ---------- DUMMY DATA ---------- */
const orders = [
  {
    id: 1,
    full_name: "Suresh Thapa",
    email: "suresh@gmail.com",
    payment_method: "cod",
    status: "pending",
    total: 215,
    created_at: "2025-12-30",
    items: [
      {
        id: 1,
        product_title: "Chic Transparent Fashion Handbag",
        quantity: 2,
        price: 100,
        subtotal: 200,
        product_image:
          "http://127.0.0.1:8000/media/product_images/1twoaDy.jpeg",
      },
      {
        id: 2,
        product_title: "Trendy Pink-Tinted Sunglasses",
        quantity: 1,
        price: 15,
        subtotal: 15,
        product_image:
          "http://127.0.0.1:8000/media/product_images/0qQBkxX.jpeg",
      },
    ],
  },
]

/* ---------- PAGE ---------- */
const OrderList = () => {
  const [openOrderId, setOpenOrderId] = useState(null)

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id)
  }

  return (
    <div >
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
             <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <>
              {/* ORDER ROW */}
              <TableRow
                key={order.id}
               
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell>{order.id}</TableCell>
                <TableCell className="font-medium">
                  {order.full_name}
                </TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell className="uppercase">
                  {order.payment_method}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{order.status}</Badge>
                </TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell  onClick={() => toggleOrder(order.id)} className="text-primary font-medium cursor-pointer hover:underline">
                 {
                  openOrderId ? "hide items" : "view items"
                 }
                </TableCell>
              </TableRow>

              {/* ITEMS ROW */}
              {openOrderId === order.id && (
                <TableRow>
                  <TableCell colSpan={8} className="bg-muted/40">
                    <div className="p-4 rounded-xl border-border">
                      <h4 className="font-semibold mb-3">
                        Order Items
                      </h4>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {order.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <img
                                  src={item.product_image}
                                  alt={item.product_title}
                                  className="h-12 w-12 rounded-lg object-cover"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {item.product_title}
                              </TableCell>
                              <TableCell>Rs. {item.price}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell className="font-semibold">
                                ${item.subtotal}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderList
