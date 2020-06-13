/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  static lastOptions = ''
  constructor(element) {

    if (!element) {
      throw new Error('Element is empty');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    console.log(TransactionsPage.lastOptions)
    this.render(TransactionsPage.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault()
      if (event.target == document.querySelector('.remove-account')) {
        this.removeAccount()
      }
      document.querySelectorAll('.transaction__remove').forEach(item => {
        console.log(item)
        console.log(event.target)
        console.log(item == event.target)

        if (item == event.target || item == event.target.closest('button')) {
          let buttonid = item.dataset.id
          console.log(buttonid)
          this.removeTransaction(buttonid)
         
        }
        // App.update()
      })
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    console.log(TransactionsPage.lastOptions)
    if (TransactionsPage.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
        
        Account.remove("id", TransactionsPage.lastOptions.account_id, (err, response) => {
          if (response && response.success) {
            this.clear()
            App.update()
          }
        })
        
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {

      Transaction.remove('id', id, (err, response) => {
        if (response && response.success) {
          App.update()
        }
      })
     
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {

    
    if (options) {
      Account.get("id", options.account_id, (err, response) => {
      if (response.success){
        response.data.forEach(item => {
          if (item.id == options.account_id) {
            this.renderTitle(item.name)
          }
        })
      }
      })
      Transaction.list(options, (err, response) => {
        if (response.success) {
          this.renderTransactions(response.data)
        }
      })
      TransactionsPage.lastOptions = options
      console.log(TransactionsPage.lastOptions)
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([])
    this.renderTitle('Название счёта')
    TransactionsPage.lastOptions = ''
    console.log(TransactionsPage.lastOptions)
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector('.content-title').innerText = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let year = new Date(date).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    let time = new Date(date).toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',

    });

    return `${year} в ${time}`

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {

    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
              <div class="col-md-7 transaction__details">
                  <div class="transaction__icon">
                    <span class="fa fa-money fa-2x"></span>
                  </div>
                <div class="transaction__info">
                <h4 class="transaction__title">${item.name}</h4>
           
                <div class="transaction__date">${this.formatDate(item.created_at)}</div>
              </div>
           </div>
           <div class="col-md-3">
              <div class="transaction__summ">
      
        ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id=${item.id}>
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let elem = this.element.querySelector('.content')  
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);  //удаляет транзакции на странице
    }
    
    if (data.length > 0) {
      data.forEach(item => {
        this.element.querySelector('.content').insertAdjacentHTML('beforeend', this.getTransactionHTML(item))
      })
    }
  }
}
