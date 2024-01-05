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
   * Дата начала соревнования.
   */
  firstDate?: Date

  /**
   * Дата окончания соревнования.
   */
  lastDate?: Date
}
