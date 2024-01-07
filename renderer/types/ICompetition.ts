import { IBase } from './IBase'
import { ICategory } from './ICategory'

/**
 * Дисциплина.
 */
export interface ICompetition extends IBase {
  /**
   * Название дисциплины.
   */
  name?: string

  /**
   * Категории дисциплины.
   */
  categories: ICategory[]
}
