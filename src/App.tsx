import './App.css'
import TopItemBaskets from '@/components/topItemBaskets'
import { CardOrderAnalytics } from './components/cardOrderAnalytics'


function App() {
	

return (
	<>
		<div className='flex flex-col gap-4'>
			<CardOrderAnalytics />
			<TopItemBaskets />
		</div>
	</>
)
}

export default App
