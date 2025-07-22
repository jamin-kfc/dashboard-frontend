import './App.css'
import { ClientCards } from '@/components/clientCards'
import { OrderHistoryBarChart } from '@/components/orderHistory'
import TopItemBaskets from '@/components/topItemBaskets'


function App() {

  return (
    <>
      <div className='flex flex-col gap-4'>
        <ClientCards />
        <OrderHistoryBarChart />
        <TopItemBaskets />
      </div>
    </>
  )
}

export default App
