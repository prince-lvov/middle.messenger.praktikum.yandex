import BlockClass from './includes/BlockClass'
import FormValidatorClass from './includes/FormValidatorClass'
import Validator from './includes/ValidatorClass'
import VALIDATION_CONDITIONS from './includes/validationConditions'

class ChatHeaderClass extends BlockClass {
	init(): void {
		const triggerEl = this.findChild('.chat-menu') as HTMLElement
		if (triggerEl) {
			triggerEl.addEventListener('click', function() {
				this.classList.toggle('open')
			})
		}

		const actionFormValues: { [action: string]: { formTitle: string, buttonValue: string } } = {
			addUser: {
				formTitle: 'Добавить пользователя',
				buttonValue: 'Добавить'
			},
			removeUser: {
				formTitle: 'Удалить пользователя',
				buttonValue: 'Удалить'
			},
			deleteChat: {
				formTitle: 'Удалить чат с пользователем',
				buttonValue: 'Удалить'
			}
		}

		const actionTriggerEls = this.findChildren('li[data-action]')
		if (actionTriggerEls !== null) {
			actionTriggerEls.forEach(actionTrigger => {
				actionTrigger.addEventListener('click', () => {
					const action = actionTrigger.dataset.action
					const availableActions = Object.keys(actionFormValues)
					if (!action || !availableActions.includes(action)) {
						return true
					}

					const title = actionFormValues[action].formTitle
					const buttonValue = actionFormValues[action].buttonValue

					popup.setProps({ action, title, buttonValue })
					popup.show()

					if (triggerEl) {
						triggerEl.classList.remove('open')
					}
				})
			})
		}
	}
}

class ChatInputAreaClass extends BlockClass {
	init(): void {
		const triggerEl = this.findChild('.clip') as HTMLElement
		if (triggerEl) {
			triggerEl.addEventListener('click', function() {
				this.classList.toggle('open')
			})
		}
	}
}

class PopupValidatorClass extends FormValidatorClass {
	createValidator(): Validator {
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

		return new Validator(errorMessageElement, {
			login: {
				element: inputEl,
				validators: [
					VALIDATION_CONDITIONS.loginSymbols
				]
			}
		})
	}
}

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

class MessageClass extends BlockClass {
	init(): void {

	}

	render(): void {
		const isMyMessage = this.props.getProperty('my') as boolean
		if (isMyMessage) {
			this.element.classList.add('is-my-message')
		}

		const statusEl = this.findChild('.chat-message--status')
		const readStatus = this.props.getProperty('read') as boolean
		if (statusEl && readStatus) {
			statusEl.classList.add('visible')
		}

		// Если сообщение имеет тип image, то в параметре image находится ссылку на картинку
		// parcel такую картинку не обрабатывает, поэтому нужно использовать внешнюю ссылку
		const messageType = this.props.getProperty('type')
		const imgEl = this.findChild('.chat-message--image img') as HTMLImageElement
		if (messageType === 'image' && imgEl) {
			const imageSrc = this.props.getProperty('image')

			if (imageSrc) {
				imgEl.src = `${imageSrc}`
			}
		}
	}
}

type Message ={
	my: boolean,    // Флаг того, что пользователь - автор сообщения
	read: boolean,  // Флаг прочитанного сообщения
	type: 'text'|'image', // Тип сообщения
	text?: string,  // Текст сообщения типа 'text'
	image?: string, // Имя файла картинки в сообщении типа 'image'
	time: string    // Время отправки сообщения
}

const messagesList: Message[] = [
	{
		my: true,
		read: true,
		type: 'text',
		text: 'Добрый день! Жду от вас схему проезда, заранее спасибо!',
		time: '09:12'
	},
	{
		my: false,
		read: false,
		type: 'text',
		text: 'Здравствуйте, ок.',
		time: '09:34'
	},
	{
		my: false,
		read: false,
		type: 'image',
		image: 'https://c1.staticflickr.com/1/185/456615533_1a8c50c266_m.jpg',
		time: '09:34'
	}
]

const messagesArea = new BlockClass('.chat-messages--parent--template')
messagesArea.mountTo('main')

const chatHeader = new ChatHeaderClass('.chat-messages--header--template')
chatHeader.mountTo(messagesArea)

const inputArea = new ChatInputAreaClass('.chat-messages--input-area--template')
inputArea.mountTo(messagesArea)

const messagesBody = new BlockClass('.chat-messages--body--template')
messagesBody.mountTo(messagesArea)

const popup = new ChatActionPopupClass('.chat-action-popup--template', {
	buttonValue: 'Добавить'
}, '.main-view')
popup.bindPropsToElements({ buttonValue: 'button', title: 'h2' })

// Сообщения в чате
messagesList.forEach(msg => {
	const messageComponent = new MessageClass(msg.type == 'text' ? '.chat-text-message--template' : '.chat-image-message--template', msg, messagesBody)
	messageComponent.bindPropsToElements({
		text: '.chat-message--text',
		time: '.chat-message--time'
	})
})