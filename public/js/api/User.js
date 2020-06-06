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
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.clear()
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
     
      return localStorage.user
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
   
    let modifiedData = Object.assign({ method: 'GET', url: User.URL + '/current', callback: newCallback }, data)
   

    function newCallback(err, response) {
      if (response.success) User.setCurrent(response.user)
      else User.unsetCurrent()
      callback(err, response)
    }
    createRequest(modifiedData)
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    let modifiedData = Object.assign({ method: 'POST', url: User.URL + '/register', callback: newCallback }, data)
    function newCallback(err, response) {
      if (response.success) {
        User.setCurrent(response.user)
      }
      callback(err, response)
    }
    createRequest(modifiedData)
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    
    let modifiedData = Object.assign({ method: 'POST', url: User.URL + '/register', callback: newCallback }, data)
    console.log(modifiedData)
    function newCallback(err, response) {
      if (response.success) {

        User.setCurrent(response.user)
      }
      callback(err, response)
    }
    createRequest(modifiedData)
  }



  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    let modifiedData = Object.assign({ method: 'POST', url: User.URL + '/logout', callback: callregister }, data)
    function callregister(err, response) {
      if (response.success) {
        User.unsetCurrent()
        callback(err, response)
      }
    }
    createRequest(modifiedData)
   
  }
}

