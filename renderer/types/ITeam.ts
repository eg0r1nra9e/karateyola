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
   * Город.
   */
  city?: string
}
