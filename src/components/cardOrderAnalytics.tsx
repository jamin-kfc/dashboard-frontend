import { useState } from "react";
import { ClientCards } from '@/components/clientCards'
import { OrderHistoryBarChart } from '@/components/orderHistory'
import { OrderIntervalMean } from '@/components/orderIntervalMean'
export function CardOrderAnalytics() {
	const [cardCode, setCardCode] = useState('C01667');
	const [sDate, setSDate] = useState('2019-01-01');
	const [eDate, setEDate] = useState('2019-12-31');


	return (
	<>
		<ClientCards cardCode = {cardCode} sDate={sDate} eDate={eDate} setCardCode = {setCardCode} setSDate = {setSDate} setEDate = {setEDate}	/>
		<OrderHistoryBarChart cardCode = {cardCode} sDate={sDate} eDate={eDate} setCardCode = {setCardCode} setSDate = {setSDate} setEDate = {setEDate}	/>
		<OrderIntervalMean cardCode = {cardCode} />	
	</>		
	
	)
}
