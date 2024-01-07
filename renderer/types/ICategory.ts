import { IBase } from './IBase'
import { IDuel } from './IDuel'
import { IStanding } from './IStanding'

/**
 * Категория.
 */
export interface ICategory extends IBase {
  /**
   * Название категории.
   */
  name?: string

  /**
   * Участвующие спортсмены
   */
  athletes: string[]

  /**
   * Турнирная таблица
   */
  standings: IStanding[]
}
