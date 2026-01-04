const stats = [
  {
    title: "Total Sales",
    value: "$34,456.00",
    change: "+14%",
    isUp: true,
  },
  {
    title: "Total Order",
    value: "3,456",
    change: "-17%",
    isUp: false,
  },
  {
    title: "Total Revenue",
    value: "$1,456.00",
    change: "+14%",
    isUp: true,
  },
  {
    title: "Total Customer",
    value: "42,456",
    change: "-11%",
    isUp: false,
  },
];
const Main = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border-border  bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {item.title}
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-semibold text-gray-900">
            {item.value}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <span
              className={`flex items-center gap-1 font-medium ${
                item.isUp ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.isUp ? "↑" : "↓"} {item.change}
            </span>
            <span className="text-gray-400">in the last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Main