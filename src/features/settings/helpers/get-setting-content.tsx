import { App, Settings } from '../model/types'
import { AboutAppSettings } from '../settings-panel/variatns/about-app-section'
import { GeneralSettings } from '../settings-panel/variatns/general-section'
import { HelpCenterSettings } from '../settings-panel/variatns/help-center-section'
import { NotificationsSettings } from '../settings-panel/variatns/notifications-section'
import { SubscriptionsSettings } from '../settings-panel/variatns/subscription-section'

type SettingValue = Settings | App

export const getSettingContent = (setting: SettingValue | null) => {
  if (!setting) {
    return null
  }

  switch (setting) {
    case Settings.General:
      return <GeneralSettings />
    case Settings.Subscription:
      return <SubscriptionsSettings />
    case Settings.Notifications:
      return <NotificationsSettings />
    case App.HelpCenter:
      return <HelpCenterSettings />
    case App.AboutTheApp:
      return <AboutAppSettings />
    default:
      return null
  }
}
