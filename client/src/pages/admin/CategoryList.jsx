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
import { useCategories } from "@/api/category-services";
import CategoryFormDialog from "../../components/admin/CategoryFormDialog";

const CategoryList = () => {
  // fetching category list
  const { data: categories, isLoading, isError, error } = useCategories();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900">Categories</h1>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9 rounded-xl"
          />
        </div>

        {/* Add Button */}
        <CategoryFormDialog />
      </div>

      {/* Table */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Category Name</TableHead>
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
            categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{format(cat.created_at,'yyyy-MM-dd')}</TableCell>
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

export default CategoryList;
