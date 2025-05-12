import { Button } from '@/shared/ui/button'

export const SubscriptionsSettings = () => (
  <div className="flex flex-col gap-2">
    <h3 className="text-base font-bold">Subscription Settings</h3>
    <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-secondary-gray p-6">
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-white-secondary">Plan Title</p>
        <p className="text-2xl text-white">1 yeas free trial</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 ">
        <p className="text-sm text-white-secondary">Access to:</p>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Attaching 10 clients</p>
          <p>Creating your own programs</p>
          <p>Displaying all clients measurements</p>
        </div>
      </div>
      <div className="max-w-[274px]">
        <Button variant="outline" size="lg">
          Your Current Plan{' '}
        </Button>
      </div>
    </div>
  </div>
)
