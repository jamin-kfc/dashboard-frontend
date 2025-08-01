// Add imports for the card. Test the card mean. Put it together with the order history bar chart and serve.
// use the port forwarding method https://github.com/microsoft/WSL/issues/4150
// Possibly this https://ngrok.com/docs

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { baseUrl } from "../EnvVars.tsx"

interface OrderIntervalProps {
    cardCode: string
}

interface OrderMeanInterval {
  mean: string
}

export function OrderIntervalMean({cardCode}: OrderIntervalProps) {


  const URL = baseUrl + `api/orders/${cardCode}/mean/`;
  const [orderIntervalMean, setOrderIntervalMean] = useState<OrderMeanInterval>({mean: 'No mean recevied.'});
  
  const fetchData = async () => {
    fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } return response;
    })
    .then(response => response.json())
    .then(data => {
      setOrderIntervalMean(data[0]);
    })
  };

  useEffect(() => {
    fetchData();
  }, [cardCode])

  return (
    <>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle> Average Order Interval </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {orderIntervalMean.mean} Days
            </CardContent>
        </Card>
    </>
  )
}
