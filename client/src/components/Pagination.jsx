import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
    handlePrev,
    handleNext,
    current_page,
    total_pages,
    prev,
    next
}) => {
  return (
    <div className="flex gap-3 items-center">
      <Button disabled={!prev} onClick={handlePrev} variant="outline" size="icon">
        <ChevronLeft />
      </Button>
      <div className="font-medium text-gray-600">
        <span>{current_page}</span>/
        <span>{total_pages}</span>
      </div>
      <Button disabled={!next} onClick={handleNext} variant="outline" size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
};
export default Pagination;
