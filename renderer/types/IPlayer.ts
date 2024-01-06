import { IBase } from './IBase'

export interface IPlayer extends IBase {
  athleteId?: string
  score?: number
  fail?: number
  benefit?: number
}
