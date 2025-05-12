import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navItems } from '../model/nav-items'

export const Navigation = () => {
  return (
    <nav className="flex flex-col gap-5">
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-5 p-5 h-[60px] rounded-3xl',
              'transition-colors duration-200',
              isActive
                ? 'bg-button-accent text-white'
                : 'bg-button-gray text-button-gray-3 hover:bg-button-gray-2',
            )
          }
        >
          <Icon className="shrink-0" width={26} height={24} />
          <span className="text-base">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
