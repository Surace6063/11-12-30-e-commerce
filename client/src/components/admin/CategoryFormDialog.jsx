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
import { Plus } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useAddCategory } from "../../api/category-services";
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react";

const CategoryFormValidationSchema = yup.object({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters long")
    .max(100, "Category name must be less than 100 characters long"),
});

const CategoryFormDialog = () => {
  const [open,setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategoryFormValidationSchema),
  });

  // muatation function to send category form data to server
  const { mutate, isPending } = useAddCategory();

  // handle form submit
  const handleAddCategory = (data) =>
    mutate(data, {
      onSuccess: () => {
        toast.success("Category added sucessfully.")
        reset()
        setOpen(false)
      },
    })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl gap-2 bg-slate-800 text-white hover:bg-slate-700 transition">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <DialogHeader className="mb-6">
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <Input
            {...register("name")}
            type="text"
            placeholder="Enter category name"
            label="Name"
            id="name"
            error={errors?.name?.message}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {
                isPending ? <>
                <Spinner />
                adding...
                </> : "Add"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryFormDialog;
