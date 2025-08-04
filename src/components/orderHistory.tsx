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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


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
import type {CardCode, StringDate} from '@/components/types'
import { baseUrl } from "../EnvVars.tsx"
type Orders = {
  invDate: string
  quantityOrdered: string
}[]

type OrderData = {
  orders: Orders
}



interface OrderHistoryBarChartProps {
  cardCode: CardCode
  sDate: StringDate
  eDate: StringDate
  setCardCode: (cardCode: CardCode) => void
  setSDate: (sDate: StringDate) => void
  setEDate: (eDate: StringDate) => void
}

export function OrderHistoryBarChart(
  {cardCode, sDate, eDate, setCardCode, setSDate, setEDate}: OrderHistoryBarChartProps
) {
  const url = baseUrl + `api/orders/${cardCode}/?startDate=${sDate}&endDate=${eDate}`
  const [graphData, setGraphData] = useState<OrderData>();
  const [displayCardCode, setDisplayCardCode] = useState(cardCode);
  const [displaySDate, setDisplaySDate] = useState(sDate);
  const [displayEDate, setDisplayEDate] = useState(eDate);  

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

  function handleSearchClick() {
//    setCardCode(displayCardCode);
    setSDate(displaySDate);
    setEDate(displayEDate);
  }



  
  return (
  <>
      <Card className="py-2">
      <CardHeader>
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
              <CardTitle>Order History</CardTitle>
              <CardDescription>DocTotal per invoice date</CardDescription>
          </div>
          <div className="flex relative z-30 flex flex-1 flex-row justify-center gap-3 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
              { 
              //<span className="text-muted-foreground align-middle text-xs">
              //    Card Code:
              //</span>
              //<Popover>
              //<PopoverTrigger asChild>
              //  <span className="text-lg leading-none font-bold sm:text-2xl">
              //    <Button className = "min-w-[120px]" variant="outline">{displayCardCode}</Button>
              //  </span>
              //</PopoverTrigger>
              //<PopoverContent>
              //  <Input 
              //    placeholder='Enter Card Code' 
              //    onChange={e => setDisplayCardCode(e.target.value)}
              //  />
              //</PopoverContent>
              //</Popover>
	      }
              <span className="text-muted-foreground text-xs">
                  From:
              </span>

              <Popover>
              <PopoverTrigger asChild>
                <span className="text-lg leading-none font-bold sm:text-2xl">
                  <Button className = "min-w-[120px]" variant="outline">{displaySDate}</Button>
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <Input 
                  placeholder='yyyy-mm-dd' 
                  onChange={e => setDisplaySDate(e.target.value)}
                />
              </PopoverContent>
              </Popover>

              <span className="text-muted-foreground text-xs">
                  To:
              </span>

              <Popover>
                <PopoverTrigger asChild>
                  <span className="text-lg leading-none font-bold sm:text-2xl">
                    <Button className = "min-w-[120px]" variant="outline">{displayEDate}</Button>
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  <Input 
                    placeholder='yyyy-mm-dd' 
                    onChange={e => setDisplayEDate(e.target.value)}
                  />
                </PopoverContent>
              </Popover>

              <Button onClick={handleSearchClick}>Search</Button>
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
