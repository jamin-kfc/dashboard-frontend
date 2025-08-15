import { useState } from "react";
import { ClientCards } from '@/components/clientCards'
import { OrderHistoryBarChart } from '@/components/orderHistory'
import { CardStatistics } from '@/components/cardStatistics'
import type { DateNul } from "./types";
export function CardOrderAnalytics() {
	const now = new Date();
	const aYearAgo = new Date(new Date().setFullYear(now.getFullYear() -1));

	const [cardCode, setCardCode] = useState('C01667');
	const [sDate, setSDate] = useState<DateNul>(aYearAgo);
	const [eDate, setEDate] = useState<DateNul>(now);
	return (
	<>
		<ClientCards setCardCode={setCardCode} />
		<OrderHistoryBarChart cardCode = {cardCode} sDate={sDate} eDate={eDate} setCardCode = {setCardCode} setSDate = {setSDate} setEDate = {setEDate}	/>
		<CardStatistics cardCode = {cardCode} />	
	</>		
	
	)
}
