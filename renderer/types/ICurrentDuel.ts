import { AthleteWithTeamAndCity } from './AthleteWithTeamAndCity'
import { IPlayer } from './IPlayer'

export interface ICurrentDuel {
  id?: string

  /**
   * Первый участник.
   */
  firstPlayer?: AthleteWithTeamAndCity & IPlayer

  /**
   * Второй участник.
   */
  secondPlayer?: AthleteWithTeamAndCity & IPlayer

  /**
   * Результаты.
   */
  winnerId?: number

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
