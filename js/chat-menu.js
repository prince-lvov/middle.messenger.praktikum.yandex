function initTopChatMenuEvents() {
	const topMenuTrigger = document.querySelector('.chat-messages--header .chat-menu')
	if (!topMenuTrigger) {
		return false
	}

	topMenuTrigger.addEventListener('click', () => {
		topMenuTrigger.classList.toggle('open')
	})
}

function initBottomChatMenuEvents() {
	const bottomMenuTrigger = document.querySelector('.chat-messages--input-area .clip')
	if (!bottomMenuTrigger) {
		return false
	}

	bottomMenuTrigger.addEventListener('click', () => {
		bottomMenuTrigger.classList.toggle('open')
	})
}

initTopChatMenuEvents()
initBottomChatMenuEvents()
