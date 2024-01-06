import { IPlayer } from './IPlayer'

export interface ICurrentDuel {
  /**
   * Идентификатор поединка.
   */
  id?: string

  /**
   * Первый участник.
   */
  playerOne?: IPlayer

  /**
   * Второй участник.
   */
  playerTwo?: IPlayer

  /**
   * Результаты.
   */
  result?: any

  /**
   * Наименование дисциплины.
   */
  competitionName: string

  /**
   * Наименование категории
   */
  categoryName: string

  /**
   * Значение таймера обратного отчета.
   */
  timer: number
}
