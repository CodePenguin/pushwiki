import ISettings from '@/interfaces/ISettings'

const defaultSettings = process.env.VUE_APP_BUNDLE_TYPE === 'core' ? require('@/classes/DefaultSettingsCore') : require('@/classes/DefaultSettingsBase')

export default defaultSettings.default as ISettings
