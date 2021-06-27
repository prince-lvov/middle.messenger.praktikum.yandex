import Validator from './ValidatorClass'
export { FormValidator as default }

abstract class FormValidator {
	protected validator: Validator

	constructor(protected formSelector: string) {
		this.validator = this.createValidator()
		this.appendEventListeners()
	}

	protected abstract createValidator(): Validator

	appendEventListeners(): void {
		this.validator.getFormFields().forEach(field => {
			field.addEventListener('focus', () => this.validator.resetErrorValue())
			field.addEventListener('blur', () => this.validateFormFields())
		})
	}

	protected validateFormFields(): void {
		this.validator.runValidation()
	}
}