// const x = require("uniqid");

/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */

  constructor(element) {
    if (!element) {
      throw new Error('Element is empty');
    }
    this.element = element;
    this.registerEvents();
  }


  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  // Находит внутри контейнера (свойство element)
  // все элементы, которые имеют атрибут data-dismiss
  // со значением modal. Устанавливает обработчик
  // событий для этих элементов, которые вызывают
  // метод onClose().

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      let buttonDismiss = event.target.closest('button')
      if (buttonDismiss.getAttribute('data-dismiss') == 'modal') {
        this.onClose()
      }
    })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose() {
    this.close()
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.element.removeEventListener('click', (event) => {
      let buttonDismiss = event.target.closest('button')
      if (buttonDismiss.getAttribute('data-dismiss') == 'modal') {
        this.onClose()
      }
    })
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block'

  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = 'none'

  }
}
