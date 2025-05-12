import { Switch } from '@/shared/ui/switch'

export function NotificationsSettings() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-base font-bold">Notifications</h1>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-4 py-3 bg-secondary-gray rounded-3xl h-[60px]">
          <div>
            <h3 className="font-bold text-base text-white">Messages</h3>
          </div>
          <Switch className="h-[31px] w-[51px]" />
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-secondary-gray rounded-3xl h-[60px]">
          <div>
            <h3 className="font-bold text-base text-white">
              General Notifications
            </h3>
          </div>
          <Switch className="h-[31px] w-[51px]" />
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-secondary-gray rounded-3xl h-[60px]">
          <div>
            <h3 className="font-bold text-base text-white">Users Activity</h3>
          </div>
          <Switch className="h-[31px] w-[51px]" />
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-secondary-gray rounded-3xl h-[60px]">
          <div>
            <h3 className="font-bold text-base text-white">
              Low Interaction Index
            </h3>
          </div>
          <Switch className="h-[31px] w-[51px]" />
        </div>
      </div>
    </div>
  )
}
