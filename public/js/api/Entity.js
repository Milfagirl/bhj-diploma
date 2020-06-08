/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = ''
  
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f) {
    let modifiedData ={}
    modifiedData.url = this.URL
    modifiedData.method ='GET'
    modifiedData.data = data
    modifiedData.callback = callback
    modifiedData.responseType = 'json'
    createRequest(modifiedData)
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    //добавляем в data.data __method PUT
    let modifiedData ={}
    modifiedData.method ='POST'
    modifiedData.url = this.URL
    modifiedData.data = data
    modifiedData.data._method = 'PUT'
    modifiedData.responseType = 'json'
    modifiedData.callback = callback
    createRequest(modifiedData)
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = f => f) {
    let modifiedData ={}
    modifiedData.method ='GET'
    modifiedData.url = this.URL
    
    modifiedData.data = data
    modifiedData.data.id = id
    modifiedData.responseType = 'json'
    modifiedData.callback = callback
    createRequest(modifiedData)
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    let modifiedData = {}
    modifiedData.method ='POST'
    modifiedData.url = this.URL
    
    modifiedData.data = data
    modifiedData.data.id = id
    modifiedData.responseType = 'json'
    modifiedData.callback = callback
    createRequest(modifiedData)
  }
}
