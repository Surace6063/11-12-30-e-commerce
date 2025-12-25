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
import cn from "@/libs/cn"

const ProductFormDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="rounded-xl gap-2 bg-slate-800 text-white hover:bg-slate-700 transition">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="mb-6">
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>

          {/* Category select */}
          <label   className={cn(
            "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          )} htmlFor="category">Category</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="cloths">cloths</SelectItem>
              <SelectItem value="electronics">electronics</SelectItem>
            </SelectContent>
          </Select>

          {/* Title */}
          <Input
            type="text"
            placeholder="Enter product title"
            label="Title"
            id="title"
            className="mb-4"
          />

          {/* Description */}
          <Textarea
            placeholder="Enter product description"
            id="description"
            className="mb-4"
            label="Description"
          />

          <div className="grid grid-cols-2 gap-3">
            {/* Price */}
            <Input
              type="number"
              placeholder="Enter price"
              label="Price"
              id="price"
              className="mb-4"
            />

            {/* Stock */}
            <Input
              type="number"
              placeholder="Enter stock quantity"
              label="Stock"
              id="stock"
              className="mb-4"
            />
          </div>

          {/* Image */}
          <Input
            type="file"
            id="image"
            accept="image/*"
            className="mb-4"
            label="Image"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ProductFormDialog;
