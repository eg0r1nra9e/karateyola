import * as fs from 'fs'
import path from 'path'

import { app } from '@electron/remote'

const filePath = path.join(app.getPath('userData'), 'karateyola.json')

export async function saveData(data) {
  const text = JSON.stringify(data)

  try {
    await fs.promises.writeFile(filePath, text, {
      encoding: 'utf-8',
    })
  } catch (e) {
    alert('Failed to save the file !')
  }
}

export async function readData() {
  const fileData = await fs.promises.readFile(filePath, {
    encoding: 'utf-8',
  })
  return JSON.parse(fileData)
}
