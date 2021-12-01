import FormValidator from './FormValidatorClass'
import Validator from './ValidatorClass'
import VALIDATION_CONDITIONS from './validationConditions'

export { RegisterFormValidator as default }

class RegisterFormValidator extends FormValidator {
	protected createValidator(): Validator {
		const registerForm = this.form

		if (!registerForm) {
			throw new Error('Не найдена форма регистрации')
		}

		const errorMessageElement = registerForm.querySelector('.error') as HTMLElement
		if (!errorMessageElement) {
			throw new Error('Не найден элемент отображения ошибки')
		}

		const password1 = registerForm.querySelector('[name="password1"]') as HTMLInputElement
		if (!password1) {
			throw new Error('Не найдено поле первого пароля')
		}

		const password2 = registerForm.querySelector('[name="password2"]') as HTMLInputElement
		if (!password2) {
			throw new Error('Не найдено поле второго пароля')
		}

		const name = registerForm.querySelector('[name="name"]') as HTMLInputElement
		if (!name) {
			throw new Error('Не найден элемент ввода имени и фамилии')
		}

		const login = registerForm.querySelector('[name="login"]') as HTMLInputElement
		if (!login) {
			throw new Error('Не найден элемент ввода логина')
		}

		const phone = registerForm.querySelector('[name="phone"]') as HTMLInputElement
		if (!phone) {
			throw new Error('Не найден элемент ввода телефона')
		}

		return new Validator(errorMessageElement, {
			name: {
				element: name,
				validators: [
					VALIDATION_CONDITIONS.firstAndLastName
				]
			},
			login: {
				element: login,
				validators: [
					VALIDATION_CONDITIONS.loginSymbols
				]
			},
			phone: {
				element: phone,
				validators: [
					VALIDATION_CONDITIONS.phoneSymbols
				]
			},
			password1: {
				element: password1,
				validators: [
					VALIDATION_CONDITIONS.passwordLength,
					VALIDATION_CONDITIONS.passwordSymbols
				]
			},
			password2: {
				element: password2,
				validators: [
					VALIDATION_CONDITIONS.passwordLength,
					VALIDATION_CONDITIONS.passwordSymbols
				]
			}
		})
	}

	validateFormFields(): boolean {
		return this.validator.runValidation() && this.validator.comparePaswords('password1', 'password2')
	}
}