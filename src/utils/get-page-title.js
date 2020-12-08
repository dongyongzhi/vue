
import i18n from '@/lang'
const title = window.userSettings.title
export default function getPageTitle(key) {
  const hasKey = i18n.te(`${key}`)
  if (hasKey) {
    const pageName = i18n.t(`${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}
