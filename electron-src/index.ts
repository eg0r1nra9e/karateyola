import { IpcMainEvent, app, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

import log from 'electron-log/main'
import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'
import createWindow from './helpers/create-window'

log.initialize()
log.errorHandler.startCatching()

const nextApp = next({ dev: isDev, dir: app.getAppPath() + '/renderer' })
const handle = nextApp.getRequestHandler()

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await nextApp.prepare()
  const port = process.argv[2] || 3000

  createServer((req: any, res: any) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })

  const currentDuelWindow = createWindow('currentDuelWindow', {
    width: 1000,
    height: 600,
    backgroundColor: 'black',
  })

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  await currentDuelWindow.loadURL(`http://localhost:${port}/current-result`)
  await mainWindow.loadURL(`http://localhost:${port}/`)
  mainWindow.webContents.openDevTools()
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})
