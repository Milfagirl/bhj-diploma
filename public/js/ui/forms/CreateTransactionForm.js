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
    super(element);
    this.renderAccountsList();
  }
  /**   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    if (user) {
      let selectForm = this.element.querySelector('select[name=account_id]');
      while (selectForm.firstChild) {
        selectForm.removeChild(selectForm.firstChild); //очищает список
      }
      Account.list('', (err, response) => {
        this.element.reset();
        if (response && response.success) {
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
      if (response.success) {
        App.update();
        if (options.data.type == 'income') {
          App.getModal("newIncome").close();
        }
        if (options.data.type == 'expense') {
          App.getModal("newExpense").close();
        }
        this.element.reset();
      }
    })
  }
}


