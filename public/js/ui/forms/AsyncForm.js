/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Element is empty');
    }
    this.element = element;
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault()
      AsyncForm.submit()
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const registerform = document.getElementById('register-form')
    
    // let formData = new FormData(document.querySelector(this.element))
    // for (let key in formData.entries())
    // formData.append('key','value')
    // console.log('AsyncForm get Data() Преобразует данные формы в объект' + formData)
    // return formData
    return {
      name : registerform.name.value,
      email : registerform.email.value,
      password : registerform.password.value
    }
  }

  onSubmit(options) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    AsyncForm.onSubmit(AsyncForm.getData())
  }
}
