import { IBase } from './IBase'
import { IGameCompetitionCategory } from './IGameCompetitionCategory'

/**
 * Дисциплина соревнования.
 */
export interface IGameCompetition extends IBase {
  /**
   * Категории дисциплины.
   */
  categories: IGameCompetitionCategory[]
}
