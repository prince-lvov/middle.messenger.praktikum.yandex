import { VDom } from '../../my_core/VDom'
import Router from '../../my_core/router'
import { create_chat, selectChat } from './ChatPageApi'

export function Sidebar ({ chats }) {
    return VDom.createElement('aside', {},
        VDom.createElement(SidebarHeader, {}),
        VDom.createElement(ChatListArea, { chats }),
    )
}
function SidebarHeader () {
    return VDom.createElement('header', {},
        VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger' }),
        VDom.createElement('button', { className: 'profile', id: 'button_profile', onclick: (e) => {
                    e.preventDefault()
                    Router.get().to('/settings')
                } },
            'Профиль',
            VDom.createElement('img', { src: require('../../images/round-arrow.svg'), alt: '' })),
        VDom.createElement(SidebarSearch, {}),
        VDom.createElement('button', { onclick: create_chat }, 'Добавить чат')
    )
}
function SidebarSearch () {
    return VDom.createElement('div', { className: 'search-line' },
        VDom.createElement('input', { type: 'search', name: 'title' }),
        VDom.createElement('div', { className: 'search-background' },
            VDom.createElement('img', { src: require('../../images/search.svg'), alt: '' }),
            VDom.createElement('span', {}, 'Название нового чата'))
    )
}


function ChatListArea ({ chats }) {
    return VDom.createElement('div', { className: 'chat-list' },
        chats.map((chat) => VDom.createElement(ChatListItems, { chat }))
    )
}

function ChatListItems ({ chat }) {
    return VDom.createElement('div', { className: 'chat-wrapper', onclick: () => { selectChat(chat) } },
        VDom.createElement('div', { className: 'chat' },
            VDom.createElement('div', { className: 'chat--smile' }),
            //VDom.createElement('time', { className: 'chat--time' }),
            VDom.createElement('div', { className: 'chat--author' }, chat.title)),
        //VDom.createElement('div', { className: 'chat--message' }),
        //VDom.createElement('div', { className: 'chat--unread-count' })),
        VDom.createElement('div', { className: 'chat--separate-line' })
    )
}