import { IBase } from './IBase'
import { IGameCompetition } from './IGameCompetition'

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
  competitions: IGameCompetition[]
}
