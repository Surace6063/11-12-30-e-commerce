import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {Plus} from "lucide-react"

const CategoryFormDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="rounded-xl gap-2 bg-slate-800 text-white hover:bg-slate-700 transition">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mb-6">
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
            <Input type="text" placeholder="Enter category name" label="Name" id="name" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default CategoryFormDialog