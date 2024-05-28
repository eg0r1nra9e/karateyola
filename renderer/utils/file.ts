//import * as fs from 'fs'

//const filePath = path.join('karateyola.json')

export function saveData(data) {
  const text = JSON.stringify(data)

  // TODO: использовать БД

  // fs.writeFileSync(filePath, text, {
  //   encoding: 'utf-8',
  // })
}

export function readData() {
  // TODO: использовать БД

  // if (!fs.existsSync(filePath)) {
  //   saveData('')
  //   return {}
  // }

  // const fileData = fs.readFileSync(filePath, {
  //   encoding: 'utf-8',
  // })

  // return JSON.parse(fileData || '{}')
  return {}
}
