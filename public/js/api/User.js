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
  static unsetCurrent(user) {
    localStorage.removeItem(user);
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    try {
      return JSON.parse(localStorage.getItem('user'))
    }
    catch (e) {
      return null
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    let modifiedData = Object.assign({ method: 'GET', url: User.URL + '/current', callback: newcallback }, data)

    function newcallback(err, response) {
      if (response.success) User.setCurrent(response.user)
      else User.unsetCurrent(response.user)
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

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    let modifiedData = Object.assign({ method: 'POST', url: URL + '/register', callregister },data)
    function callregister(err,response) {
      if (response,success) {
        User.setCurrent(response.user)
      }
      callback(err,response)
    }
    createRequest(modifiedData)
  }



  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    let modifiedData = Object.assign({ method: 'POST', url: URL + '/logout', callregister },data)
    function callregister(err,response) {
      if (response,success) {
        User.unsetCurrent(response.user)
      }
      callback(err,response)
    }
    createRequest(modifiedData)
  }
}

