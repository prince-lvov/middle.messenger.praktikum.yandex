import BlockClass from '../../js/includes/BlockClass'
import { PopupValidatorClass } from './popupValidator'
import FormValidatorClass from '../../js/includes/FormValidatorClass'

class ChatActionPopupClass extends BlockClass {
	init(): void {
		const component = this
		this.element.addEventListener('click', () => {
			component.hide()
		})

		const windowEl = this.findChild('.window')
		if (windowEl) {
			windowEl.addEventListener('click', ev => ev.stopPropagation())
		}

		const closeLinkEl = this.findChild('.cancel')
		if (closeLinkEl) {
			closeLinkEl.addEventListener('click', () => {
				component.hide()
			})
		}

		const formEl = this.findChild('form')
		if (formEl) {
			const validator: FormValidatorClass = new PopupValidatorClass(formEl)
			formEl.addEventListener('submit', ev => {
				ev.preventDefault()
				if (!validator.validateFormFields()) {
					return false
				}
				console.log('%c%s', 'color: #d42', `❗Нужен обработчик события ${formEl.dataset.action}`)
				this.hide()
			})
		}
	}

	render() {
		const formEl = this.findChild('form')
		if (formEl) {
			formEl.dataset.action = this.props.getProperty('action')
		}
	}

	componentDidShow(): void {
		const inputEl = this.findChild('input') as HTMLInputElement
		if (inputEl) {
			inputEl.value = ''
			inputEl.focus()
		}
	}
}

export const popup = new ChatActionPopupClass('.chat-action-popup--template', {
	buttonValue: 'Добавить'
}, '.main-view')
popup.bindPropsToElements({ buttonValue: 'button', title: 'h2' })