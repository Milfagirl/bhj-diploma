/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarClick = document.querySelector('.sidebar-toggle')
    const bodyForSideBar = document.querySelector('.sidebar-mini')
    sidebarClick.addEventListener('click', (event) => {
      event.preventDefault()
      bodyForSideBar.classList.toggle('sidebar-open')
      bodyForSideBar.classList.toggle('sidebar-collapse')

    })

  }


   /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  // При нажатии на кнопку «Регистрация» необходимо
  // открыть окно #modal-register
  // (предварительно найдя его через App.getModal)
  // с помощью метода Modal.open()
  // При нажатии на кнопку «Войти»
  // необходимо открыть окно #modal-login 
  // (предварительно найдя его через App.getModal) 
  // с помощью метода Modal.open()
  // При нажатии на кнопку «Выйти» 
  // необходимо вызвать метод User.logout
  // и после успешного выхода 
  // (response.success = true),
  // нужно вызвать App.setState( 'init' )
  static initAuthLinks() {
    let newRegistr = App.getModal('register') //нашли окно #modal-register
    let newLogin = App.getModal('login') //нашли окно #modal-login 

    document.querySelector('.menu-item_login').addEventListener('click', (event) => {
      event.preventDefault()
      newLogin.open()
    })
    document.querySelector('.menu-item_register').addEventListener('click', (event) => {
      event.preventDefault()
      newRegistr.open()

    })
    document.querySelector('.menu-item_logout').addEventListener('click', (event) => {
      event.preventDefault()
      User.logout(JSON.parse(localStorage.user), (err,response) => {
        if (response.success) {
          App.setState('init')
        }
      })
     
    })
  }
    
}



