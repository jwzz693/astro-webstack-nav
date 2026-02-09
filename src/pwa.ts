import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onNeedRefresh() {
    // Show a prompt to user to refresh
    console.log('New content available, click on reload button to update.')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})
