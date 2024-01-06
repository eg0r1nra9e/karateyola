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
  standings: any
}
