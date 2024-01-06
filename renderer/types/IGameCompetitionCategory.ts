import { IBase } from './IBase'
import { IDuel } from './IDuel'

/**
 * Категория дисциплины.
 */
export interface IGameCompetitionCategory extends IBase {
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
