import { IBase } from './IBase'
import { ICategory } from './ICategory'
import { ICompetition } from './ICompetition'

/**
 * Соревнование.
 */
export interface IGame extends IBase {
  /**
   * Название соревнования.
   */
  name?: string

  /**
   * Даты проведения соревнований.
   */
  dates?: Date[]

  /**
   * Статус соревнования
   */
  status: 'ожидает начала' | 'идет' | 'закончено'

  /**
   * Дисциплины соревнования.
   */
  competitions: ICompetition[]

  categories: ICategory[]
}
