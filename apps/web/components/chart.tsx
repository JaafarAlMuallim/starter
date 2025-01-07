"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import { api } from "@/trpc/client";
import { notFound } from "next/navigation";
import Loader from "@/components/loader";

export const description = "An interactive bar chart";

const chartConfig = {
  chirps: {
    label: "Chirps Chirped",
  },
  all: {
    label: "Chirps",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

//type ChartProps = {
//  chirps: {
//    date: string;
//    chirps: number;
//  }[];
//  total: number;
//};

export function Chart() {
  //export function Chart({ chirps, total }: ChartProps) {
  const {
    data: chirps,
    isPending,
    isError,
  } = api.dashboard.getChirpsByDay.useQuery();
  const total = chirps?.reduce((acc, curr) => {
    return acc + curr.chirps;
  }, 0);

  if (isPending) return <Loader />;

  if (isError) {
    notFound();
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing Total Chirps By Day</CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              {chartConfig["all"].label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total?.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chirps}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="chirps"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"chirps"} fill={`var(--color-all)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
