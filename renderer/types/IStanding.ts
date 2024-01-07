import { IBase } from './IBase'
import { IDuel } from './IDuel'

export interface IStanding extends IBase {
  duels: IDuel[]
}
