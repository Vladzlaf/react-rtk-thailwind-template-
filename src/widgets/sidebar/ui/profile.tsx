import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

export const Profile = () => {
  return (
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2.5 p-3 rounded-3xl transition-colors duration-200',
          isActive
            ? 'bg-button-accent text-white'
            : 'bg-button-gray text-white hover:bg-button-gray-2',
        )
      }
    >
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <span>Home Page</span>
    </NavLink>
  )
}
