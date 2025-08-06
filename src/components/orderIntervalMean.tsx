// Add imports for the card. Test the card stat. Put it together with the order history bar chart and serve.
// use the port forwarding method https://github.com/microsoft/WSL/issues/4150
// Possibly this https://ngrok.com/docs

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { baseUrl } from "../EnvVars.tsx"

interface OrderIntervalProps {
  cardCode: string
}

interface CardStatistic {
  stat: string
}

interface QuarterStatistic {
  quarter: string
  quarterlySales: string
}


export function OrderIntervalMean({cardCode}: OrderIntervalProps) {


  const statURL = baseUrl + `api/orders/${cardCode}/mean/`;
  const weekURL = baseUrl + `api/orders/${cardCode}/byWeek/`;
  const monthURL = baseUrl + `api/orders/${cardCode}/byMonth/`;
  const quarterURL = baseUrl + `api/orders/${cardCode}/byQuarter/`;
  const [orderIntervalMean, setOrderIntervalMean] = useState<CardStatistic>({stat: 'No stat recevied.'});
  const [salesByWeek, setSalesByWeek] = useState<CardStatistic>({stat: 'No stat recevied.'});
  const [salesByMonth, setSalesByMonth] = useState<CardStatistic>({stat: 'No stat recevied.'});
  const [salesByQuarter, setSalesByQuarter] = useState<QuarterStatistic>({quarter: 'No stat recevied.', quarterlySales: 'No stat received'});

  const fetchMean = async () => {
   fetch(statURL)
   .then(response => {
     if (!response.ok) {
       throw new Error(`Response status: ${response.status}`);
     } return response;
   })
   .then(response => response.json())
   .then(data => {
     setOrderIntervalMean(data[0]);
   });
  };

  const fetchWeekSales = async () => {
    fetch(weekURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } return response;
    })
    .then(response => response.json())
    .then(data => {
      setSalesByWeek(data[0]);
    })
  };

  const fetchMonthSales = async () => {
    fetch(monthURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } return response;
    })
    .then(response => response.json())
    .then(data => {
      setSalesByMonth(data[0]);
    })
  };

  const fetchQuarterData = async () => {
    fetch(quarterURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } return response;
    })
    .then(response => response.json())
    .then(data => {
      setSalesByQuarter(data[0]);
    })
  };


  useEffect(() => {
    fetchMean();   
    fetchWeekSales();
    fetchMonthSales();
    fetchQuarterData();
  }, [cardCode])

  return (
    <>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle> Average Order Interval </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {orderIntervalMean.stat} Days
            </CardContent>
        </Card>
	
        <Card className="w-full max-w-sm">
          <CardHeader>
              <CardTitle> Weekly Sales </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {salesByWeek.stat} 
          </CardContent>
        </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle> Monthly Sales </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {salesByMonth.stat} 
        </CardContent>
      </Card>
	
      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle> Quarterly Sales </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {salesByQuarter.quarter}
            {salesByQuarter.quarterlySales} 
        </CardContent>
      </Card>

    </>
  )
}
