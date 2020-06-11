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

    let modifiedData = {
      url: this.URL,
      method: 'GET',
      callback: callback,
      responseType: 'json',
      data: data


    }
    // modifiedData.url =  this.URL
    // let id = data.id
    // console.log(modifiedData)

    // modifiedData.data.id  = id
    // // modifiedData.data.user_id = data.id
    // modifiedData.method ='GET'
    // modifiedData.callback = callback
    // modifiedData.responseType = 'json'
    // delete modifiedData.data.id
    createRequest(modifiedData)
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


    modifiedData.data._method = 'PUT'

    createRequest(modifiedData)
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id, data, callback = f => f) {  //static get(id = '', data, callback = f => f)
    let newData = { [id]: data }

    console.log(newData)
    let modifiedData = {
      url: this.URL,
      method: 'GET',
      callback: callback,
      responseType: 'json',
      data: newData


    }




    createRequest(modifiedData)


    //   let modifiedData = {}
    //   modifiedData.method = 'GET'
    //   modifiedData.url = `${this.URL}/${id}`
    //   // console.log(id)
    //   // modifiedData.data.id = data.id
    //   // modifiedData.id = id   //или data.id ?
    //   modifiedData.responseType = 'json'
    //   modifiedData.callback = callback
    //   createRequest(modifiedData)
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id, data, callback = f => f) { //static remove(id = '', data, callback = f => f)

    let newData = {[id]: data}
    newData._method = 'DELETE'

      let modifiedData = {
      data: newData,
      method: 'POST',
      url: this.URL,
      responseType: 'json',
      callback: callback
    }
    createRequest(modifiedData)
  }
}
