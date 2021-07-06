import BlockClass from '../../js/includes/BlockClass'

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

export const inputArea = new ChatInputAreaClass('.chat-messages--input-area--template')