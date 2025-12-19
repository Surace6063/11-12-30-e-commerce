import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthContainer from "@/components/MaxWidthContainer";

const CartPageSkeleton = () => {
  return (
    <MaxWidthContainer className="my-10">
      {/* Page title */}
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart items skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-6 p-6 border border-zinc-200 rounded-2xl"
            >
              <Skeleton className="w-28 h-28 rounded-xl" />

              <div className="flex-1 flex justify-between">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-24" />

                  <div className="flex items-center gap-2 pt-3">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-5 w-10" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary skeleton */}
        <div className="border border-zinc-200 rounded-2xl p-6 space-y-4 h-fit">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-px w-full my-4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-10 w-full rounded-xl mt-4" />
        </div>
      </div>
    </MaxWidthContainer>
  );
};
export default CartPageSkeleton;
