import { IBase } from './IBase'

/**
 * Поединок
 */
export interface IDuel extends IBase {
  /**
   * Идентификаторы спортсмена
   */
  athletesId: string[]
}
