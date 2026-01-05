import DashboardStat from "../../components/admin/DashboardStat"
import OrderBarChart from "../../components/admin/OrderBarChart"


const Main = () => {
  return (
    <div>
      <DashboardStat />
      <div className="mt-10">
        <h1 className="text-xl font-semibold text-gray-900">
          Order for last 12 months
        </h1>
       <OrderBarChart />
      </div>
    </div>
  )
}
export default Main





