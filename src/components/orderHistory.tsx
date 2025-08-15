import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { DatePicker } from '@/components/datePicker'


const chartConfig = {
    uoms: {
        label: "UoM",
    },
    orders: {
        label: "CardNames",
        color: "var(--chart-1)"
    }
} satisfies ChartConfig

import { useState, useEffect } from 'react';
import type {CardCode, DateNul} from '@/components/types'
import { baseUrl } from "../EnvVars.tsx"

type Order = {
    invDate: string
    quantityOrdered: string
}
// type Orders = {
//   invDate: string
//   quantityOrdered: string
// }[]

type OrderData = {
  orders: Order[]
}

import { convertDateToQueryFormat } from "./helperFuncs.tsx"

interface OrderHistoryBarChartProps {
  cardCode: CardCode
  sDate: DateNul
  eDate: DateNul
  setCardCode: (cardCode: CardCode) => void
  setSDate: (sDate: DateNul) => void
  setEDate: (eDate: DateNul) => void
}

export function OrderHistoryBarChart(
  {cardCode, sDate, eDate, setSDate, setEDate}: OrderHistoryBarChartProps
) {
  const url = baseUrl + `api/orders/${cardCode}/?startDate=${convertDateToQueryFormat(sDate)}&endDate=${convertDateToQueryFormat(eDate)}`
  const [graphData, setGraphData] = useState<OrderData>();
  const [exportURL, setExportURL] = useState('');

  function replacer(value: string): string {
    return value == null ? "null" : value;	
  }

  function exportToCSV(data: OrderData) {
	const header = Object.keys(data.orders[0]);
	const contents = data.orders.map((entry: Order) => 
    header.map((fieldname) => replacer(entry[fieldname as keyof Order])).join(","))
  .join("\r\n");
	return [header.join(','), contents].join("\r\n");
  }

  function typedArrayToURL(contents: string, mimeType: string) {
	return URL.createObjectURL(
		new Blob([contents], {type: mimeType}),
	);
  }
 
  const fetchData = async () => {
      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        } return response;
      })
      .then(response => response.json())
      .then(data => {
        setGraphData(data);
      })
  };
  useEffect(() => {
    fetchData();
      }, [cardCode, sDate, eDate])

  
  useEffect(() => {
	if (typeof graphData !== 'undefined') {
		if (graphData.orders.length != 0) {
		setExportURL(typedArrayToURL(exportToCSV(graphData), "text/csv"));
		}	
	};
  }, [graphData])

  return (
  <>
      <Card className="py-2">
      <CardHeader>
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
              <CardTitle>Order History</CardTitle>
              <CardDescription>DocTotal per invoice date</CardDescription>
          </div>
          <div className="flex relative z-30 flex flex-1 flex-row justify-center gap-8 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <div className="">
              <Badge variant="secondary">{cardCode}</Badge>
            </div>

            <div>
              <DatePicker date={sDate} setDate={setSDate} pickerTitle="From:"/>
            </div>
            <div>
              <DatePicker date={eDate} setDate={setEDate} pickerTitle="To:" />
            </div>
	    <div>
	      <a href={exportURL} download={cardCode+sDate?.toISOString().split('T')[0]+eDate?.toISOString().split('T')[0]} className="hover:underline"> Export as csv</a>
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
              data={graphData?.orders}
              margin={{
                  left: 12,
                  right: 12,
              }}
              >
                <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="invDate"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                  />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                    />
                  }
                />
                <Bar dataKey="totalOrdered"></Bar>
              </BarChart>
          </ChartContainer>
      </CardContent>
      </Card>
  </>)
}
