/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f) {

    let modifiedData = {
      url: this.URL,
      method: 'GET',
      callback: callback,
      responseType: 'json',
      data: data
    }
    
    createRequest(modifiedData);
  }


  /**
  * Создаёт счёт или доход/расход с помощью запроса
  * на сервер. (в зависимости от того,
  * что наследуется от Entity)
  * */
  static create(data, callback = f => f) {
    let modifiedData = {
      url: this.URL,
      method: 'POST',
      callback: callback,
      responseType: 'json',
      data: data,
    }

    modifiedData.data._method = 'PUT';
    createRequest(modifiedData);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id, data, callback = f => f) {  //static get(id = '', data, callback = f => f)
   
    let modifiedData = {
      url: this.URL,
      method: 'GET',
      callback: callback,
      responseType: 'json',
      id : id
    }

    createRequest(modifiedData);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id, data, callback = f => f) { //static remove(id = '', data, callback = f => f)

    let newData = {[id]: data};
    newData._method = 'DELETE';

      let modifiedData = {
      data: newData,
      method: 'POST',
      url: this.URL,
      responseType: 'json',
      callback: callback
    }
    createRequest(modifiedData);
  }
}
