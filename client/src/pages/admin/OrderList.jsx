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
import { useOrders } from "../../api/order-services"
import { format } from 'date-fns'
import useAuthStore from "../../zustand/useAuthStore"


/* ---------- PAGE ---------- */
const OrderList = () => {
  const {isAuthenticated} = useAuthStore()
  if(!isAuthenticated) return <p>Please login first to see your order history.</p>

  // fetching order list
  const {data:orders,isLoading,isError,error} = useOrders()

  const [openOrderId, setOpenOrderId] = useState(null)

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id)
  }

  if(isLoading) return <p>loading....</p>
  if(isError) return <p>{error.message}</p>

  if(orders?.length === 0) return <p>No order found!</p>

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
                <TableCell>
                  {format(order.created_at,'yyyy-MM-dd')}
                </TableCell>
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
