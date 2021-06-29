import { validationCondition } from './validationConditions'
export { Validator as default }

class Validator {
	/**
	 * Создание функций-валидаторов для любого из добавленных полей
	 * @param {Element} errorField DOM-элемент, в который выводится текст ошибки
	 * @param {object} validators Объект с колбэками-валидаторами для поля с именем fieldName в нём же передаётся текст сообщения об ошибке
	 */
	constructor(private errorField: HTMLElement, private validators: {
		[fieldName: string]: {
			element: HTMLInputElement,
			validators: validationCondition[]
		}
	}) {}

	/**
	 * Специальная функция сверки двух паролей. Сделана отдельно, так как оперирует сразу двумя полями
	 * @param {string} password1Name Имя поля, в котором содержится первый пароль
	 * @param {string} password2Name Имя поля, в котором содержится второй пароль
	 *  */
	comparePaswords(password1Name: string, password2Name: string): boolean {
		if (!(password1Name in this.validators) || !(password2Name in this.validators)) {
			throw 'Значения паролей не добавлены в валидатор'
		}

		const password1 = this.validators[password1Name].element.value
		const password2 = this.validators[password2Name].element.value

		if (password1.length && password2.length && password1 !== password2) {
			this.setErrorValue('Пароли не совпадают')
			return false
		}

		return true
	}

	/**
	 * Получение массива зарегистрированных элементов формы
	 */
	getFormFields(): HTMLInputElement[] {
		return Object.values(this.validators).map(function (object){
			return object.element
		})
	}

	/**
	 * Запуск проверки указанного поля
	 * @param {string} fieldName Имя поля, которое нужно проверить
	 */
	runValidation(): boolean {
		this.resetErrorValue()

		// Проверка полей, для имён которых зарегистрированы функции валидации
		for (let fieldName in this.validators) {
			if (!this.validateField(fieldName)) {
				return false
			}
		}

		return true
	}

	/**
	 * Проверка валидности указанного поля
	 * @return {boolean} true, если поле валидно
	 */
	private validateField(fieldName: string): boolean {
		return this.validators[fieldName].validators.every(condition => {
			const validationResult = condition.callback.call(this, this.validators[fieldName].element.value)

			if (validationResult !== true) {
				this.setErrorValue(condition.errorMessage)
				return false
			}

			return true
		})
	}

	/**
	 * Сброс значения поля с ошибкой
	 */
	resetErrorValue(): void {
		this.errorField.textContent = ''
	}

	/**
	 * Установка значения для поля с текстом ошибки
	 * @param {string} errorText Текст ошибки
	 */
	private setErrorValue(errorText: string): void {
		this.errorField.textContent = errorText
	}
}