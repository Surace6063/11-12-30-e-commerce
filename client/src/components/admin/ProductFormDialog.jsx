import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import cn from "@/libs/cn";
import { useCategories } from "@/api/category-services";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { productFormValidationSchema } from "../../validation/product-validation";

const ProductFormDialog = () => {
  // fetching catagoeries
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFormValidationSchema),
  });

  const handleProductSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl gap-2 bg-slate-800 text-white hover:bg-slate-700 transition">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form
          onSubmit={handleSubmit(handleProductSubmit)}
          className="space-y-4"
        >
          <DialogHeader className="mb-6">
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>

          {/* Category select */}
          <label
            className={cn(
              "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            )}
            htmlFor="category"
          >
            Category
          </label>
          <Select {...register("category")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Title */}
          <Input
            type="text"
            placeholder="Enter product title"
            label="Title"
            id="title"
            className="mb-4"
            {...register("title")}
            error={errors?.title?.message}
          />

          {/* Description */}
          <Textarea
            placeholder="Enter product description"
            id="description"
            className="mb-4"
            label="Description"
            {...register("description")}
            error={errors?.description?.message}
          />

          <div className="grid grid-cols-2 gap-3">
            {/* Price */}
            <Input
              type="number"
              placeholder="Enter price"
              label="Price"
              id="price"
              className="mb-4"
              {...register("price")}
              error={errors?.price?.message}
            />

            {/* Stock */}
            <Input
              type="number"
              placeholder="Enter stock quantity"
              label="Stock"
              id="stock"
              className="mb-4"
              {...register("stock")}
              error={errors?.stock?.message}
            />
          </div>

          {/* Image */}
          <Input
            type="file"
            id="image"
            accept="image/*"
            className="mb-4"
            label="Image"
            {...register("image")}
            error={errors?.image?.message}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
