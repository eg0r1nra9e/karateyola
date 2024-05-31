import { IBase } from './IBase'

/**
 * Команда.
 */
export interface ITeam extends IBase {
  /**
   * Название команды.
   */
  name?: string

  /**
   * Идентификатор города.
   */
  cityId?: number

  /**
   * Город.
   */
  city?: any
}
