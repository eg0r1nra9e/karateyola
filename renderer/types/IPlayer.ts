import { IBase } from './IBase'

export interface IPlayer extends IBase {
  athleteId?: string
  score?: number
  fail?: number
  fail2?: number
  benefit?: number
}
