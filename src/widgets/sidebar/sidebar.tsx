import { cn } from '@/lib/utils'
import { Logo } from './ui/logo'
import { Navigation } from './ui/navigation'
import { Profile } from './ui/profile'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'bg-screen text-white h-screen p-5 pt-10 pr-0 flex flex-col gap-5 transition-all duration-300 w-64',
        className,
      )}
    >
      <Logo />
      <Profile />
      <Navigation />
    </aside>
  )
}
