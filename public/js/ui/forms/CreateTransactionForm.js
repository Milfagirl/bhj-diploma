/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */

  constructor(element) {
    super(element)
    this.renderAccountsList();
  }
  /**   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current()
    if (user) {
      let selectForm = this.element.querySelector('select[name=account_id]')
      Account.list('', (err, response) => {
        if (response && response.success) {
          // let selectForm = this.element.querySelector('select[name=account_id]')

          for (let i = 0; i < response.data.length; i++) {
            selectForm.options[i] = new Option(`${response.data[i].name}`, `${response.data[i].id}`);
          }
        } else {
          console.log(`Ошибка ${err}`);
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options.data, (err, response) => {
      App.getModal("newIncome").close();
      App.getModal("newExpense").close();
      if (response.success) {
        // App.getModal("newIncome").close();
        // App.getModal("newExpense").close();
        App.update()
      }
    })
  }
}

