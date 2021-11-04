import BlockClass from '../../js/includes/BlockClass'
import LoginFormValidatorClass from '../../js/includes/LoginFormValidatorClass'

class LoginFormClass extends BlockClass {
    init() {
        const formEl = this.findChild('form.login')
        if (formEl) {
            try {
                const validator: LoginFormValidatorClass = new LoginFormValidatorClass(formEl)
                formEl.addEventListener('submit', ev => {
                    ev.preventDefault()
                    if (!validator.validateFormFields()) {
                        return false
                    }
                    console.log('%c%s', 'color: #d42', '❗Отправляется запрос на авторизацию пользователя')
                })
            }
            catch (exception) {
                console.error(`Инициализация валидатора формы логина не удалась: ${exception}`)
            }
        }
        else {
            throw new Error('Не найдена форма входа')
        }
    }
}
export const loginForm = new LoginFormClass('.login-form--template')


