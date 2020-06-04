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
    try {
      this.element = element
      // this.registerEvents()
    }
    catch (e) {
      return e
    }
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
    
    const disMiss = document.querySelectorAll("button")
    console.log(disMiss)
    disMiss.forEach(elem, function () {
      elem.addEventListener('click', function () {
        Modal.onClose()
      })
    })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose() {
    Modal.element.close()
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.element.forEach(elem => {
      elem.removeEventListener('click', Modal.onClose())
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
