// import { response } from "express"

// import { response } from "express"

/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error(' element is empty')
    }
    this.element = element
    this.registerEvents()
    this.update()
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault()
      if (event.target == document.querySelector('.create-account')) {
        App.getModal('createAccount').open()
      }
  
      if (event.target.tagName.toLowerCase() ==   'a') {
       
        this.onSelectAccount(event.target)
      }
    })
  }


  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current()
    if (user) {
      Account.list(user, (err, response) => {
        if (response && response.success) {
         
          this.clear()
          response.data.forEach(element => {
            this.renderItem(element)
          });
        } else {
          console.log(`Ошибка ${err}`);
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {

    let accountDivs = (document.querySelectorAll('.account'))
    accountDivs.forEach(element => {
      element.remove()
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
      
      document.querySelectorAll('.active').forEach(item => {
        item.classList.remove('active')
      }) 
      let elementLi = element.closest('li')
      console.log(elementLi)
      elementLi.classList.add('active')
      console.log(element)
      // App.showPage('transactions', { account_id: response.data.id })
    

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    
    let number = (this.element.querySelectorAll('.account')).length + 1
    
    let html = `<li class="active account" data-id=${number}> <a href="#"> <span>${item.name}</span> / <span>${item.sum} ₽</span> </a> </li>`

    return html
  }

  /* * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */

  renderItem(item) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item))
  }
}
