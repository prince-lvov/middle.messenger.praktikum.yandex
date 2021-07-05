import FormValidatorClass from '../../js/includes/FormValidatorClass'
import ValidatorClass from '../../js/includes/ValidatorClass'
import VALIDATION_CONDITIONS from '../../js/includes/validationConditions'

export class PopupValidatorClass extends FormValidatorClass {
	createValidator(): ValidatorClass {
		const formEl = this.form

		if (!formEl) {
			throw new Error('Не найден элемент формы во всплывающем окне')
		}

		const inputEl = formEl.querySelector('input')
		if (!inputEl) {
			throw new Error('Не найдено поле ввода логина во всплывающем окне')
		}

		const errorMessageElement = formEl.querySelector('.error') as HTMLElement
		if (!errorMessageElement) {
			throw 'Не найден элемент отображения ошибки'
		}

		return new ValidatorClass(errorMessageElement, {
			login: {
				element: inputEl,
				validators: [
					VALIDATION_CONDITIONS.loginSymbols
				]
			}
		})
	}
}