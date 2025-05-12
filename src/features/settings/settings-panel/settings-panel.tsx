import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { App, APP_VALUES, Settings, SETTINGS_VALUES } from '../model/types'
import { getSettingContent } from '../helpers/get-setting-content'
import { useAuth } from '@/app/providers/auth-provider'

export const SettingsPanel = () => {
  const { setUser } = useAuth()
  const [selectedSetting, setSelectedSetting] = useState<Settings | App | null>(
    null,
  )

  const logoutHandler = () => {
    setUser({ user: null, tokens: null })
  }
  return (
    <div className="flex flex-row gap-2.5 h-full">
      <div className="w-[40%]">
        <div>
          <h2 className="text-base mb-3 text-white">Settings</h2>
          <div className="flex flex-col gap-2">
            {SETTINGS_VALUES.map((setting) => (
              <Button
                key={setting}
                variant={
                  selectedSetting === setting
                    ? 'secondaryGrayActive'
                    : 'secondaryGray'
                }
                onClick={() => setSelectedSetting(setting)}
                className="justify-start text-left h-14"
              >
                {setting}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-base mb-3 text-white">App</h2>
          <div className="flex flex-col gap-2">
            {APP_VALUES.map((setting) => (
              <Button
                key={setting}
                variant={
                  selectedSetting === setting
                    ? 'secondaryGrayActive'
                    : 'secondaryGray'
                }
                onClick={() => setSelectedSetting(setting)}
                className="justify-start text-left h-14"
              >
                {setting}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="ghost"
            className="text-red-dark-mode"
            onClick={logoutHandler}
          >
            Log Out
          </Button>
        </div>
      </div>

      <div className="w-[60%] h-[695px] bg-primary-gray rounded-[20px] p-6 shadow-sm mr-5">
        {selectedSetting ? (
          <div>{getSettingContent(selectedSetting)}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-white-secondary">
            Select a category from the list on the left
          </div>
        )}
      </div>
    </div>
  )
}
