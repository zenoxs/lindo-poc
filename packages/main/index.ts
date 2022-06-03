import { app } from 'electron'
import { release } from 'os'
import { Application } from './application'
import { setupRootStore } from './store'

app.commandLine.appendSwitch('disable-site-isolation-trials')

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

app.whenReady().then(async () => {
  console.log('App ->', 'whenReady')
  const store = await setupRootStore()
  Application.init(store)
  Application.instance.run()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
