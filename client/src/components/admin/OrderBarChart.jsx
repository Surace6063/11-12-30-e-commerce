import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { month: "January", order: 186 },
  { month: "February", order: 305 },
  { month: "March", order: 237 },
  { month: "April", order: 73 },
  { month: "May", order: 209 },
  { month: "June", order: 214 },
];

const chartConfig = {
  desktop: {
    label: "Order",
    color: "oklch(12.9% 0.042 264.695)",
  },
};

const OrderBarChart = () => {
  return (
    <ChartContainer className="h-[40vh]" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="order" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};

export default OrderBarChart;
