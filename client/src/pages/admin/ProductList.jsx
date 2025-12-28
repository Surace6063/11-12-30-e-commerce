import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/api/product-services";
import ProductFormDialog from "../../components/admin/ProductFormDialog";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { useDebounce } from "use-debounce";
import { useDeleteProduct } from "../../api/product-services";
import toast from "react-hot-toast";

const PAGE_SIZE = 5

const ProductList = () => {
  const [page, setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const [serachValue,setSearchValue] = useState("")

  const [debouncedSearchValue] = useDebounce(serachValue,500)

  // fetching product list
  const { data: products, isLoading, isError, error } = useProducts({
    page,
    page_size : PAGE_SIZE,
    search: debouncedSearchValue
  });



   // set total_page to totalPage state
  // only update totalPage state if api total_pages updated
    useEffect(()=>{
      if(products?.total_pages) setTotalPage(products.total_pages)
    },[products?.total_pages])


  const handleNext = () => {
    if (products && page < products.total_pages) {
      setPage((prev) => Number(prev) + 1);
    }
  };

  const handlePrev = () => {
    if (products && page > 1) {
      setPage((prev) => Number(prev) - 1);
    }
  };

  // mutation function to delete product
  const {mutate} = useDeleteProduct()

  const handleDeleteProduct = (id) => {
    mutate(id,{
      onSuccess: () => toast.success("Product deleted sucessfully.")
    })
  }


  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 rounded-xl"
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>

        {/* Add Button */}
        <ProductFormDialog />
      </div>

      {/* Table */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
             <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
               <TableHead>Stock</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>loading...</TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell>{error.message}</TableCell>
            </TableRow>
          ) : (
            products.results.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.title} className="size-16 rounded-md shadow" />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{format(item.created_at,'yyyy-MM-dd')}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="secondary">
                    <Edit className="h-4 w-4 text-sky-600" />
                  </Button>
                  <Button onClick={()=>handleDeleteProduct(item.id)} variant="secondary">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter className="border-border">
          <TableRow>
            <TableCell colspan="8">
             <div className="flex justify-center">
                <Pagination handleNext={handleNext} handlePrev={handlePrev} current_page={page} total_pages={totalPage} next={products?.next} prev={products?.previous} />
             </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductList;
