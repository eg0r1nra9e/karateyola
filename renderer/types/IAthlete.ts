/**
 * Спортсмен.
 */
export interface IAthlete {
  /**
   * Идентификатор спортсмена.
   */
  id?: string

  /**
   * Имя спортсмена.
   */
  firstName?: string

  /**
   * Фамилия спортсмена.
   */
  lastName?: string

  /**
   * Дата рождения спортсмена.
   */
  dateOfBirth?: Date

  /**
   * Идентификатор команды.
   */
  teamId?: string

  /**
   * Пол спортсмена.
   */
  gender?: 'м' | 'ж'

  /**
   * Вес спортсмена
   */
  weight?: number
}
