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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import cn from "@/libs/cn";
import { useCategories } from "@/api/category-services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { productFormValidationSchema } from "../../validation/product-validation";
import { useState } from "react";
import { useAddProduct } from "../../api/product-services";

const ProductFormDialog = () => {
  // image preview state
  const [imagePreview, setImagePreview] = useState(null);
  const [open,setOpen] = useState(false)

  const handleImagePreview = (e) => {
    const imageFile = e.target.files[0];
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
  };

  // fetching catagoeries
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFormValidationSchema),
  })
  
  // mutation function to add new product
  const {mutate,isPending} = useAddProduct()

  const handleProductSubmit = (data) => {
    const formData = new FormData()
    formData.append("title",data.title)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",data.price)
    formData.append("stock",data.stock)

    if(data.image){
      formData.append("image", data.image[0])
    }

    mutate(formData,{
      onSuccess: () => {
        toast.success("Product added sucessfully.")
        reset()
        setOpen(false)
        setImagePreview(null)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl gap-2 bg-slate-800 text-white hover:bg-slate-700 transition">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
          <select
            className="w-full p-2 rounded-md border border-gray-300"
            id="category"
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

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
            onChange={handleImagePreview}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="size-32 rounded-md shadow"
            />
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {
                isPending ? <><Spinner /> adding...</> : "Add"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
