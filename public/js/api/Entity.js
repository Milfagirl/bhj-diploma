/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = ''
  constructor() {
  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f) {
    let modifiedData = Object.assign({ method: 'GET' }, data);
    modifiedData.callback = callback
    createRequest(modifiedData)
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    //добавляем в data.data __method PUT
    let modifiedData = Object.assign({method: 'POST'}, data);
    modifiedData.data._method = 'PUT'
    modifiedData.callback = callback
    createRequest(modifiedData)
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = f => f) {
    let modifiedData = Object.assign({method: 'GET' }, data);
    modifiedData.data.id = id
    modifiedData.callback = callback
    createRequest(modifiedData)
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    let modifiedData = Object.assign({method :'POST'}, data);
    modifiedData.data.id = id
    modifiedData.data._method = 'DELETE'
    modifiedData.callback = callback
    createRequest(modifiedData)
  }
}
