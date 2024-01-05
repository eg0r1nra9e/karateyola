import { IGameCompetitionCategory } from './IGameCompetitionCategory'

/**
 * Дисциплина соревнования.
 */
export interface IGameCompetition {
  /**
   * Идентификатор дисциплины соревнования.
   */
  id: string

  /**
   * Идентификатор дисциплины
   */
  competitionId: string

  /**
   * Категории дисциплины.
   */
  categories: IGameCompetitionCategory[]
}
