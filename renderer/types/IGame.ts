import { IGameCompetition } from './IGameCompetition'

/**
 * Соревнование.
 */
export interface IGame {
  /**
   * Идентификатор соревнования.
   */
  id?: string

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
