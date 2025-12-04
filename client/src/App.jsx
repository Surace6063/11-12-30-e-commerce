import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import ProductPage from "./pages/ProductPage"

const App = () => {
  return (
   <>
    <Routes>
      {/* main layout */}
      <Route element={<MainLayout />}>
           <Route path="/" element={<HomePage />} />
           <Route path="/products" element={<ProductPage />} />
      </Route>

    </Routes>
   </>
  )
}
export default App