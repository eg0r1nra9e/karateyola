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
  name: string

  /**
   * Время боя.
   */
  time: number

  /**
   * Дополнительное время боя.
   */
  additionTime: number

  /**
   * Участвующие спортсмены
   */
  athletes: string[]

  /**
   * Турнирная таблица
   */
  standings: IStanding[]
}
