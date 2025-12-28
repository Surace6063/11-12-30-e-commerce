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
import { Edit } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useUpdateCategory } from "../../api/category-services";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

const CategoryFormValidationSchema = yup.object({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters long")
    .max(100, "Category name must be less than 100 characters long"),
});

const CategoryUpdateFromDialog = ({ category }) => {
  const [open,setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategoryFormValidationSchema),
  });

  useEffect(()=>{
    if(category && category.name) setValue("name",category.name)
  },[category?.name])

  // muatation function to send category form data to server
  const { mutate, isPending } = useUpdateCategory();

  // handle form submit
  const handleUpdateCategory = (data) => {
    if (category && category.id) {
      mutate(
        { id: category.id, data },
        {
          onSuccess: () => {
            toast.success("Category updated sucessfully.");
            reset();
            setOpen(false)
          },
        }
      );
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Edit className="h-4 w-4 text-sky-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
          <DialogHeader className="mb-6">
            <DialogTitle>Update Category</DialogTitle>
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
              {isPending ? (
                <>
                  <Spinner />
                  updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryUpdateFromDialog;
