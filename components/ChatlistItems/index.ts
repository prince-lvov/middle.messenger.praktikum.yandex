import BlockClass from '../../js/includes/BlockClass'

class ChatListElementComponent extends BlockClass {
    render(): void {
        const unreadCount = this.props.getProperty('unreadCount')
        const chatEl = this.findChild('.chat')
        if (chatEl && unreadCount !== null) {
            chatEl.classList.add(`unread-${unreadCount}`)
        }

        const unreadCounter = this.findChild('.chat--unread-count')
        if (unreadCounter && unreadCount !== null && unreadCount == 0) {
            unreadCounter.classList.add('hidden')
        }
    }

    init(): void {
        this.element.addEventListener('click', clickHandler.bind(this))
    }
}

// Обработчик клика по диалогу в списке чатов в aside
function clickHandler(this: BlockClass) {
    console.info('Клик по элементу в списке чатов', this)
}

export { ChatListElementComponent }