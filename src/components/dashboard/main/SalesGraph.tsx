// import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "../../ui/card"
// import {
//     ChartConfig,
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/ui/chart"
// const chartData = [
//     { month: "January", sales: 186 },
//     { month: "February", sales: 205 },
//     { month: "March", sales: -207 },
//     { month: "April", sales: 173 },
//     { month: "May", sales: -209 },
//     { month: "June", sales: 214 },
// ]
// const chartConfig = {
//     sales: {
//         label: "sales",
//     },
// } satisfies ChartConfig

// export default function SalesGraph() {
//     return (
//         <Card className="border-gray-200 shadow-lg">
//             <CardHeader>
//                 <CardTitle className="text-2xl">Sales</CardTitle>
//                 <CardDescription>January - June 2025</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig}>
//                     <BarChart accessibilityLayer data={chartData}>
//                         <CartesianGrid vertical={false} />
//                         <ChartTooltip
//                             cursor={false}
//                             content={<ChartTooltipContent hideLabel hideIndicator />}
//                         />
//                         <Bar dataKey="sales">
//                             <LabelList position="top" dataKey="month" fillOpacity={1} />
//                             {chartData.map((item) => (
//                                 <Cell
//                                     key={item.month}
//                                     fill={
//                                         item.sales > 0
//                                             ? "rgb(37, 243, 72)"
//                                             : "rgb(218, 0, 0)"
//                                     }
//                                 />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col items-start gap-2 text-sm">
//                 <div className="flex gap-2 font-medium leading-none items-center">
//                     Trending up by 5.2% this month <TrendingUp className="h-7 w-7 text-green-500" />
//                 </div>
//                 <div className="leading-none text-muted-foreground">
//                     Showing total Sales for the last 6 months
//                 </div>
//             </CardFooter>
//         </Card>
//     )
// }
