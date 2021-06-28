import Validator from './ValidatorClass'
export { FormValidator as default }

abstract class FormValidator {
	protected validator: Validator
	protected form: HTMLElement | undefined = undefined

	constructor(form: string | HTMLElement) {
		if (form instanceof HTMLElement) {
			this.form = form
		}
		else {
			this.form = document.querySelector(form) as HTMLElement || undefined
		}
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

	validateFormFields(): boolean {
		return this.validator.runValidation()
	}
}