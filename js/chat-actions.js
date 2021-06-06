function initTopChatMenuEvents() {
	const topMenuTrigger = document.querySelector('.chat-messages--header .chat-menu')
	const topSubMenu = document.querySelector('.chat-messages--header .submenu')
	const actionPopup = document.querySelector('.chat-action-popup')

	if (!topMenuTrigger || !topSubMenu || !actionPopup) {
		return false
	}

	topMenuTrigger.addEventListener('click', () => {
		topMenuTrigger.classList.toggle('open', !topMenuTrigger.classList.contains('open'))
	})

	const subMenuElements = topSubMenu.querySelectorAll('[data-action]')
	if (!subMenuElements) {
		return false
	}

	const actionFormValues = {
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

	subMenuElements.forEach(element => {
		element.addEventListener('click', function(event) {
			const action = this.dataset.action

			if (!actionFormValues[action]) {
				return false
			}

			const popupForm = actionPopup.querySelector('form')
			const popupTitle = actionPopup.querySelector('h2')
			const popupButton = actionPopup.querySelector('button')
			const popupInput = actionPopup.querySelector('input')

			if (!popupForm || !popupTitle || !popupButton || !popupInput) {
				return false
			}

			popupForm.dataset.action = action
			popupTitle.textContent = actionFormValues[action].formTitle
			popupButton.textContent = actionFormValues[action].buttonValue

			topMenuTrigger.classList.remove('open')
			actionPopup.classList.add('open')

			popupInput.focus()
		})
	})

	// Разные способы закрытия попапа
	const actionPopupCloseLink = actionPopup.querySelector('.cancel')
	if (!actionPopupCloseLink) {
		return false
	}

	actionPopupCloseLink.addEventListener('click', () => {
		actionPopup.classList.remove('open')
	})

	const popupWindow = actionPopup.querySelector('.window')
	if (!popupWindow) {
		return false
	}
	popupWindow.addEventListener('click', event => event.stopPropagation())

	actionPopup.addEventListener('click', () => {
		actionPopup.classList.remove('open')
	})
}

// Обработка формы в попапе
function initActionPopupFormSubmitHandler() {
	const actionPopup = document.querySelector('.chat-action-popup')
	if (!actionPopup) {
		return false
	}

	const form = actionPopup.querySelector('form')
	const input = actionPopup.querySelector('input')

	const actionDescriptions = {
		addUser: 'Добавление пользователя',
		removeUser: 'Удаление пользователя из чата',
		deleteChat: 'Удаление чата с пользователем'
	}

	form.addEventListener('submit', event => {
		event.preventDefault()

		const currentAction = form.dataset.action

		if (!actionDescriptions[currentAction]) {
			console.warn('Попытка выполнить неизвестное действие')
			return false
		}

		if (!input.value.length) {
			console.warn('Нужно ввести логин пользователя')
			return false
		}

		console.log(actionDescriptions[currentAction] + ': ' + input.value)
		input.value = ''
		actionPopup.classList.remove('open')
	})
}


function initBottomChatMenuEvents() {
	const bottomMenuTrigger = document.querySelector('.chat-messages--input-area .clip')
	if (!bottomMenuTrigger) {
		return false
	}

	bottomMenuTrigger.addEventListener('click', () => {
		bottomMenuTrigger.classList.toggle('open', !bottomMenuTrigger.classList.contains('open'))
	})
}

initTopChatMenuEvents()
initBottomChatMenuEvents()
initActionPopupFormSubmitHandler()