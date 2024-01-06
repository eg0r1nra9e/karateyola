import { IBase } from './IBase'
import { IPlayer } from './IPlayer'

export interface ICurrentDuel extends IBase {
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
