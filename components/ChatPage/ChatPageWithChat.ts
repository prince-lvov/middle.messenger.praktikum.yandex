import { VDom } from '../../my_core/VDom'
import { state } from '../../my_core/core'
import { sendMessage } from './ChatPageApi'
import { InitSubmenu } from './InitSubmenu'

export function ChatPageWithChat () {
    return VDom.createElement('main', { },
        VDom.createElement('div', { className: 'chat-messages--parent' },
            VDom.createElement(ChatHeader),
            VDom.createElement(InputArea),
            VDom.createElement(MessagesBody)
        ),
    )
}

export function ChatHeader () {
    return VDom.createElement('div', { className: 'chat-messages--header' },
        VDom.createElement('div', { className: 'smile' }),
        VDom.createElement('div', { className: 'name' }, state.OnlyUsersInChatAlready),
        VDom.createElement('div', { className: 'chat-menu', onclick: InitSubmenu },
            VDom.createElement('img', { src: require('../../images/chat-icons/chat-menu.svg'), alt: '' })
        ),
        VDom.createElement('ul', { className: 'submenu' },
            VDom.createElement('li', { dataAction: 'addUser' },
                VDom.createElement('img', { src: require('../../images/chat-icons/add-user.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Добавить пользователя')),
            VDom.createElement('li', { dataAction: 'removeUser' },
                VDom.createElement('img', { src: require('../../images/chat-icons/remove-user.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Удалить пользователя')),
            VDom.createElement('li', { dataAction: 'deleteChat' },
                VDom.createElement('img', { src: require('../../images/chat-icons/delete-chat.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Удалить чат'))
        )
    )
}

function InputArea () {
    return VDom.createElement('form', { className: 'chat-messages--input-area' },
        VDom.createElement('div', { className: 'clip' },
            VDom.createElement('img', { src: require('../../images/chat-icons/clip.svg'), alt: '' })),
        VDom.createElement('input', { type: 'text', placeholder: 'Сообщение', name: 'message' }),
        VDom.createElement('div', { className: 'arrow', onclick: sendMessage },
            VDom.createElement('img', { src: require('../../images/chat-icons/send-arrow.svg'), alt: '' })),
        VDom.createElement('ul', { className: 'submenu' },
            VDom.createElement('li', { },
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-photo-video.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Фото или видео')),
            VDom.createElement('li', {},
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-file.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Файл')),
            VDom.createElement('li', {},
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-location.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Локация'))
        )
    )
}

function MessagesBody () {
    const messages = state.messages.map(m => {
        return m.user_id === state.user.id ? VDom.createElement(MessageMy, { message: m }) : VDom.createElement(MessageYou, { message: m })
    })
    return VDom.createElement('div', { className: 'chat-messages--body' },
        VDom.createElement('div', { className: 'chat-message date-line' }, '17 Мая 2021'),
        ...messages
    )
}

function MessageMy ({ message }) {
    return VDom.createElement('div', { className: 'chat-message text-message is-my-message' },
        VDom.createElement('div', { className: 'chat-message--text' }, message.content),
        VDom.createElement('div', { className: 'chat-message--time-and-status' },
            VDom.createElement('div', { className: 'chat-message--status visible' },
                VDom.createElement('img', { src: require('../../images/chat-icons/message-read.svg'), alt: '' })),
            VDom.createElement('time', { className: 'chat-message--time' }, message.time.substring(11, 19).toLocaleString()))
    )
}

function MessageYou ({ message }) {
    return VDom.createElement('div', { className: 'chat-message text-message' },
        VDom.createElement('div', { className: 'chat-message--text' }, message.content),
        VDom.createElement('div', { className: 'chat-message--time-and-status' },
            VDom.createElement('div', { className: 'chat-message--status' },
                VDom.createElement('img', { src: require('../../images/chat-icons/message-read.svg'), alt: '' })),
            VDom.createElement('time', { className: 'chat-message--time' }, message.time.substring(11, 19).toLocaleString()))
    )
}