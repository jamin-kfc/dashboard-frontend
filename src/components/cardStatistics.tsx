// Add imports for the card. Test the card stat. Put it together with the order history bar chart and serve.
// use the port forwarding method https://github.com/microsoft/WSL/issues/4150
// Possibly this https://ngrok.com/docs

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card.tsx";
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


export function CardStatistics({cardCode}: OrderIntervalProps) {


  const statURL = baseUrl + `api/orders/${cardCode}/mean/`;
  const weekURL = baseUrl + `api/orders/${cardCode}/byWeek/`;
  const monthURL = baseUrl + `api/orders/${cardCode}/byMonth/`;
  const quarterURL = baseUrl + `api/orders/${cardCode}/byQuarter/`;
  const recentSaleURL = baseUrl + `api/orders/${cardCode}/recent/`;
  const [orderIntervalMean, setOrderIntervalMean] = useState<CardStatistic>({stat: '0'});
  const [salesByWeek, setSalesByWeek] = useState<CardStatistic>({stat:'0'});
  const [salesByMonth, setSalesByMonth] = useState<CardStatistic>({stat: '0'});
  const [salesByQuarter, setSalesByQuarter] = useState<QuarterStatistic>({quarter: 'No stat recevied.', quarterlySales: '0'});
  const [recentSaleDate, setRecentSaleDate] = useState<CardStatistic>({stat: '0'});


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

    const fetchRecentSale = async () => {
    fetch(recentSaleURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } return response;
    })
    .then(response => response.json())
    .then(data => {
      setRecentSaleDate(data[0]);
    })
  };

  useEffect(() => {
    fetchMean();   
    fetchWeekSales();
    fetchMonthSales();
    fetchQuarterData();
    fetchRecentSale();
  }, [cardCode])


  return (
    <>
      <div className="grid grid-cols-5 gap-4">
          <Card className="w-full max-w-sm">
              <CardHeader>
                  <CardTitle> Average Order Interval </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {orderIntervalMean === undefined ? 'N/A' : orderIntervalMean.stat} Days
              </CardContent>
          </Card>
    
          <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle> Past 7 Days Sales </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                £{parseInt(salesByWeek.stat).toLocaleString()} 
            </CardContent>
          </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
              <CardTitle> Sales this Month </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              £{parseInt(salesByMonth.stat).toLocaleString()} 
          </CardContent>
        </Card>
    
        <Card className="w-full max-w-sm">
          <CardHeader>
              <CardTitle> Quarterly Sales </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {salesByQuarter.quarter}: £{parseInt(salesByQuarter.quarterlySales).toLocaleString()} 
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
              <CardTitle> Most Recent Sale </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {
		      recentSaleDate === undefined ? 'N/A' : recentSaleDate.stat 
	      }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
