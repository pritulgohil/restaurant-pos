"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Label, Tooltip } from "recharts";
import PieChartToolTip from "@/app/components/Pos/Dashboard/PieChartToolTip";
import { CardFooter } from "@/components/ui/card";

const data = [
  { name: "Queued", value: 12, fill: "#60a5fa" }, // blue-400
  { name: "In Progress", value: 8, fill: "#2563eb" }, // blue-600
];

export default function ActiveOrdersPieChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center">
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          stroke="none"
        >
          <Label
            position="center"
            content={() => (
              <text textAnchor="middle" dominantBaseline="middle">
                <tspan
                  x="120"
                  y="115"
                  className="fill-foreground text-3xl font-bold"
                >
                  {total}
                </tspan>
                <tspan
                  x="120"
                  y="140"
                  className="fill-muted-foreground text-sm"
                >
                  Orders
                </tspan>
              </text>
            )}
          />
        </Pie>
        <Tooltip content={<PieChartToolTip />} />
      </PieChart>

      {/* Footer preserved exactly */}
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Live kitchen workload{" "}
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="leading-none text-muted-foreground">
          Queued vs In-Progress orders
        </div>
      </CardFooter>
    </div>
  );
}
