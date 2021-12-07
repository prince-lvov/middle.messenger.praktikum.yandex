import FormValidator from './FormValidatorClass'
import Validator from './ValidatorClass'
import VALIDATION_CONDITIONS from './validationConditions'

export { LoginFormValidator as default }

class LoginFormValidator extends FormValidator {
	protected createValidator(): Validator {
		const loginForm = this.form

		if (!loginForm) {
			throw new Error('Не найдена форма логина')
		}

		const errorMessageElement = loginForm.querySelector('.error') as HTMLElement
		if (!errorMessageElement) {
			throw new Error('Не найден элемент отображения ошибки')
		}

		const login = loginForm.querySelector('[name="login"]') as HTMLInputElement
		if (!login) {
			throw new Error('Не найден элемент ввода логина')
		}

		const password = loginForm.querySelector('[name="password"]') as HTMLInputElement
		if (!password) {
			throw new Error('Не найдено поле ввода пароля')
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