import FormValidator from './includes/FormValidatorClass'
import Validator from './includes/ValidatorClass'
import VALIDATION_CONDITIONS from './includes/validationConditions'

class LoginFormValidator extends FormValidator {
	protected createValidator(): Validator {
		const loginForm = document.querySelector(this.formSelector) as HTMLElement

		if (!loginForm) {
			throw 'Не найдена форма логина'
		}

		const errorMessageElement = loginForm.querySelector('.error') as HTMLElement
		if (!errorMessageElement) {
			throw 'Не найден элемент отображения ошибки'
		}

		const login = loginForm.querySelector('[name="login"]') as HTMLInputElement
		if (!login) {
			throw 'Не найден элемент ввода логина'
		}

		const password = loginForm.querySelector('[name="password"]') as HTMLInputElement
		if (!password) {
			throw 'Не найдено поле ввода пароля'
		}

		return new Validator(errorMessageElement, {
			login: {
				element: login,
				validators: [
					VALIDATION_CONDITIONS.loginSymbols
				]
			},
			password: {
				element: password,
				validators: [
					VALIDATION_CONDITIONS.passwordLength,
					VALIDATION_CONDITIONS.passwordSymbols
				]
			}
		})
	}
}


try {
	new LoginFormValidator('form.login')
}
catch (exception) {
	console.error(`Инициализация валидатора формы логина не удалась: ${exception}`)
}