import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/api/product-services";

const ProductList = () => {
  // fetching product list
  const { data: products, isLoading, isError, error } = useProducts({
    page : 1,
    page_size : 5
  });

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
          />
        </div>

        {/* Add Button */}
        <Button className="rounded-xl gap-2 bg-slate-800 text-white hover:bg-slate-700 transition">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
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
                  <Button variant="secondary">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
