import { useQuery } from "@tanstack/react-query";
import { Users, PackageCheck } from "lucide-react";
import { apiRequest } from "../../libs/apiRequest";

const DashboardStat = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await apiRequest("/dashboard/stats/");
      return response.data;
    },
  });

  if(isLoading) return <p>loading...</p>
  if(isError) return <p>{error.message}</p>

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Sales */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Total Sales</p>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          ${data.total_sales}
        </h2>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-gray-400">in the last 6 month</span>
        </div>
      </div>

      {/* Total Order */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex gap-4 items-center">
          <p className="text-sm font-medium text-gray-500">Total Order</p>
          <PackageCheck size={15} className="text-gray-400" />
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          {data.total_orders}
        </h2>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-gray-400">in the last 6 month</span>
        </div>
      </div>

      {/* Total Customer */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-500">Total Customer</p>
          <Users size={15} className="text-gray-400" />
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          {data.total_users}
        </h2>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-gray-400">in the last 6 month</span>
        </div>
      </div>
    </div>
  );
};
export default DashboardStat;
