import { Link } from 'react-router-dom'
import { LogoIcon } from '@/shared/assets/icons'
import { cn } from '@/lib/utils'

export const Logo = () => {
  return (
    <Link
      to="/main"
      className={cn(
        'flex items-center mb-6 gap-1.5 transition-all duration-300 justify-start',
      )}
    >
      <LogoIcon className="w-8 h-8 text-orange-500" />

      <div className="flex flex-col">
        <span className="text-white text-2xl font-bold leading-4.5">
          Project Name
        </span>
      </div>
    </Link>
  )
}
