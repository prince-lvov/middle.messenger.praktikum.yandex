import BlockClass from '../../js/includes/BlockClass'
import RegisterFormValidatorClass from '../../js/includes/RegisterFormValidatorClass'

class RegisterFormClass extends BlockClass {
    init() {
        const formEl = this.findChild('form.register')
        if (formEl) {
            try {
                const validator: RegisterFormValidatorClass = new RegisterFormValidatorClass(formEl)
                formEl.addEventListener('submit', ev => {
                    ev.preventDefault()
                    if (!validator.validateFormFields()) {
                        return false
                    }
                    console.log('%c%s', 'color: #d42', '❗Отправляется запрос на регистрацию пользователя')
                })
            }
            catch (exception) {
                console.error(`Инициализация валидатора формы регистрации не удалась: ${exception}`)
            }
        }
        else {
            throw new Error('Не найдена форма регистрации')
        }
    }
}
export const registerForm = new RegisterFormClass('.register-form--template')
//registerForm.mountTo('body')