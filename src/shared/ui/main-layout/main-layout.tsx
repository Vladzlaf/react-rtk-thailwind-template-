import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/widgets/sidebar'
import { Header } from '../header'

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="bg-screen flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="bg-screen flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
