import { IDuel } from './IDuel'

/**
 * Категория дисциплины.
 */
export interface IGameCompetitionCategory {
  /**
   * Название.
   */
  name: string

  /**
   * Участвующие спортсмены
   */
  athletes: string[]

  /**
   * Турнирная таблица
   */
  standings: IDuel[]
}
