import { Typography } from "@material-ui/core";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function HorizontalBarChart({ data }) {
  return (
    <>
      <Typography align="center" variant="h5">
        Last 6 months
      </Typography>
      <ResponsiveContainer height={data.length * 50 + 10} width="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 40, left: 40, bottom: 20 }}
          layout="vertical"
          barCategoryGap="20%"
          barGap={2}
          maxBarSize={10}
        >
          <CartesianGrid
            horizontal={false}
            stroke="#a0a0a0"
            strokeWidth={0.5}
          />
          <Tooltip />
          <XAxis
            type="number"
            axisLine={false}
            stroke="#a0a0a0"
            domain={[0, 10]}
            strokeWidth={0.5}
          />
          <YAxis type="category" dataKey="name" width={170} />
          <Bar
            dataKey="value"
            animationDuration={1000}
            label={{ position: "right", backgroundColor: "#fff" }}
            shape={
              <Rectangle
                style={{ fill: "orange" }}
                //className={classes.rectangle}
                radius={[0, 10, 10, 0]}
              />
            }
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default HorizontalBarChart;
