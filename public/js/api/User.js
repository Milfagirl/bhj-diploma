/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user'
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);

  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user)
    } else
      return undefined

  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    let modifiedData = {
      method : 'POST',
      url : this.URL + '/current',
      callback : newCallback,
      data : data,
      responseType: "json"
    }
    function newCallback(err, response) {
      console.log(response.user, response.success)
      if (response.user && response.success) {
        User.setCurrent(response.user);
      } else if (!response.success) {
        User.unsetCurrent();
      }
      callback(err, response)
    }
    return createRequest(modifiedData)
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    let modifiedData
    modifiedData.data = data
    modifiedData.url = User.URL + '/login'
    modifiedData.method = 'POST'
    modifiedData.callback = newCallback
    modifiedData.responseType  = 'json'
    console.log(modifiedData)
    function newCallback(err, response) {
      if (response.success) {
        User.setCurrent(response.user)
      }
      callback(err, response)
    }
    return createRequest(modifiedData)
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    let modifiedData
    modifiedData.data = data
    modifiedData.url = User.URL + '/register'
    modifiedData.method = 'POST'
    modifiedData.callback = newCallback
    modifiedData.responseType  = 'json'


    function newCallback(err, response) {
      if (response.success) {

        User.setCurrent(response.user)
      }
      callback(err, response)
    }
    return createRequest(modifiedData)
  }



  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    let modifiedData
    modifiedData.data = data
    modifiedData.url = User.URL + '/logout'
    modifiedData.method = 'POST'
    modifiedData.callback = newCallback
    modifiedData.responseType  = 'json'

      function newCallback(err, response) {
      if (response.success) {
        User.unsetCurrent()
      }
      callback(err, response)
    }
    return createRequest(modifiedData)
  }
}

