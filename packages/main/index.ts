import { app } from 'electron'
import { release } from 'os'
import './samples/electron-store'
import './samples/npm-esm-packages'
import './store/store'
import './menu'
import { Application } from './application'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

const application = Application.instance
app.whenReady().then(() => {
  console.log('Application ->', 'whenReady')
  application.run()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
