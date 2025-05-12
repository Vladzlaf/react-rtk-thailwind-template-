export enum Settings {
  General = 'General',
  Subscription = 'Subscription',
  Notifications = 'Notifications',
}

export enum App {
  HelpCenter = 'Help Center',
  AboutTheApp = 'About the App',
}

export type SettingType = keyof typeof Settings
export type SettingValue = `${Settings}`

export type AppType = keyof typeof App
export type AppValue = `${App}`

export const SETTINGS_VALUES = Object.values(Settings)
export const SETTINGS_KEYS = Object.keys(Settings) as SettingType[]

export const APP_VALUES = Object.values(App)
export const APP_KEYS = Object.keys(App) as AppType[]
