import BlockClass from '../../js/includes/BlockClass'
import { popup } from '../Popup/index'

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

export const chatHeader = new ChatHeaderClass('.chat-messages--header--template')