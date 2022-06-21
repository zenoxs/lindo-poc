import { WindowHotkey } from '@lindo/shared'
import { app, Menu, MenuItemConstructorOptions } from 'electron'
import { Application } from './application'

const isMac = process.platform === 'darwin'

export const getAppMenu = (windowHotkey: WindowHotkey) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Window',
          accelerator: windowHotkey.newWindow,
          click() {
            Application.instance.createGameWindow()
          }
        },
        {
          label: 'New Tab',
          accelerator: windowHotkey.newTab,
          click() {
            // focusedWindow.webContents.send('new-tab', {})
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Close Tab',
          accelerator: windowHotkey.closeTab,
          click() {
            // focusedWindow.webContents.send('close-tab', {})
          }
        },
        {
          label: 'Close Window',
          accelerator: 'Shift+CmdOrCtrl+W',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.close()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          role: 'undo'
        },
        {
          label: 'Redo',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          role: 'cut'
        },
        {
          label: 'Copy',
          role: 'copy'
        },
        {
          label: 'Paste',
          role: 'paste'
        },
        {
          label: 'Select All',
          role: 'selectAll'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          type: 'separator'
        },

        {
          label: 'Prev Tab',
          accelerator: windowHotkey.prevTab,
          click() {
            // focusedWindow.webContents.send('previous-tab', 'prev')
          }
        },
        {
          label: 'Next Tab',
          accelerator: windowHotkey.nextTab,
          click() {
            // focusedWindow.webContents.send('next-tab', 'next')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Disable Sound',
          type: 'checkbox',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.setAudioMuted(item.checked)
          }
        },
        {
          label: 'Zoom In',
          role: 'zoomIn'
        },
        {
          label: 'Zoom Out',
          role: 'zoomOut'
        },
        {
          label: 'Reset Zoom',
          role: 'resetZoom'
        },
        {
          type: 'separator'
        },
        {
          label: 'Enter Full Screen',
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Infos',
      submenu: [
        {
          label: 'Console',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        }
      ]
    }
  ]
  if (isMac) {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideOthers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })
    // Edit menu.
    const windowSubmenu = template[2]!.submenu as Array<MenuItemConstructorOptions>
    windowSubmenu.push!(
      {
        type: 'separator'
      },
      {
        label: 'Sound',
        submenu: [
          {
            label: 'Enable Sound',
            role: 'startSpeaking'
          },
          {
            label: 'Disable Sound',
            role: 'stopSpeaking'
          }
        ]
      }
    )
  }

  return Menu.buildFromTemplate(template)
}
