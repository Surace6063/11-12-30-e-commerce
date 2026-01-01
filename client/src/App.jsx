import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import ProductPage from "./pages/ProductPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import {Toaster} from "react-hot-toast"
import CartPage from "./pages/CartPage"
import AdminLayout from "./layout/AdminLayout"
import ProductList from "./pages/admin/ProductList"
import CategoryList from "./pages/admin/CategoryList"
import Main from "./pages/admin/Main"
import UserList from "./pages/admin/UserList"
import OrderList from "./pages/admin/OrderList"
import Checkout from "./pages/Checkout"
import UserOrderList from "./pages/UserOrderList"

const App = () => {
  return (
   <>
   <Toaster />
    <Routes>
      {/* main layout */}
      <Route element={<MainLayout />}>
           <Route path="/" element={<HomePage />} />
           <Route path="/products" element={<ProductPage />} />
           <Route path="/products/:slug/:id" element={<ProductDetailPage />} />
           <Route path="/carts" element={<CartPage />} />
           <Route path="/orders" element={<UserOrderList />} />
      </Route>

      {/* admin layout */}
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route path="main" element={<Main />} />
        <Route path="products" element={<ProductList />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="users" element={<UserList />} />
        <Route path="orders" element={<OrderList />} />
      </Route>

       <Route path="/checkout" element={<Checkout />} />

    </Routes>
   </>
  )
}
export default App