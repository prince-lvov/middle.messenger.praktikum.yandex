import { VDom } from "../../my_core/VDom";
import Router from "../../my_core/router";
import { state } from '../../my_core/core'
import {getData, sendMessage, selectChat, create_chat, ChoiceAction} from "./ChatPageApi"

function InitSubmenu () {

    const triggerEl = document.querySelector('.chat-menu')
    if (triggerEl) {
        triggerEl.classList.toggle('open')
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

    const children = document.querySelector('.submenu').querySelectorAll('li')
    const actionTriggerEls = Array.from(children)

    if (actionTriggerEls !== null) {
        actionTriggerEls.forEach(actionTrigger => {
            actionTrigger.addEventListener('click', () => {
                const action = actionTrigger.dataAction
                const availableActions = Object.keys(actionFormValues)
                if (!action || !availableActions.includes(action)) {
                    return true
                }
                const title = actionFormValues[action].formTitle
                const buttonValue = actionFormValues[action].buttonValue

                const popup = document.querySelector('.chat-action-popup')
                popup.querySelector('.h2').innerText = title
                popup.getElementsByTagName('button')[0].textContent = buttonValue
                popup.style.display = 'block'

                if (triggerEl) {
                    triggerEl.classList.remove('open')
                }
            })
        })
    }
}

export default function ChatPage () {
    if (!state.user.id) getData().then(() => {
        if (localStorage.currentChat && !state.currentChat) selectChat(JSON.parse(localStorage.currentChat))
    })

    const children = state.currentChat ? [
        VDom.createElement(Sidebar, {chats: state.chats}),
        VDom.createElement(ChatPageWithChat),
        VDom.createElement(Popup)
    ] : [
        VDom.createElement(Sidebar, {chats: state.chats}),
        VDom.createElement(Popup)
    ]
    return VDom.createElement('div', { className: 'site-wrapper main-view'}, children)
}

function Sidebar ({ chats }) {
    return VDom.createElement('aside', {},
        VDom.createElement(SidebarHeader),
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
        VDom.createElement(SidebarSearch),
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
        VDom.createElement('div', { className: 'chat'},
            VDom.createElement('div', { className: 'chat--smile' }),
          //VDom.createElement('time', { className: 'chat--time' }),
            VDom.createElement('div', { className: 'chat--author' }, chat.title)),
          //VDom.createElement('div', { className: 'chat--message' }),
          //VDom.createElement('div', { className: 'chat--unread-count' })),
        VDom.createElement('div', { className: 'chat--separate-line' })
    )
}
//############

function ChatPageWithChat () {
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
        VDom.createElement('div', { className: 'name'}, state.OnlyUsersInChatAlready),
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
         VDom.createElement('div', { className: 'clip'},
                 VDom.createElement('img', { src: require('../../images/chat-icons/clip.svg'), alt: '' })),
        VDom.createElement('input', { type: 'text', placeholder: 'Сообщение', name: 'message' }),
        VDom.createElement('div', { className: 'arrow', onclick: sendMessage },
                VDom.createElement('img', { src: require('../../images/chat-icons/send-arrow.svg'), alt: '' })),
        VDom.createElement('ul', { className: 'submenu' },
            VDom.createElement('li', { },
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-photo-video.svg') }),
                VDom.createElement('span', {className: 'menu-action' }, 'Фото или видео')),
            VDom.createElement('li', {},
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-file.svg') }),
                VDom.createElement('span', {className: 'menu-action' }, 'Файл')),
            VDom.createElement('li', {},
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-location.svg') }),
                VDom.createElement('span', {className: 'menu-action' }, 'Локация'))
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

function MessageImage () {
    return VDom.createElement('div', { className: 'chat-message image-message' },
        VDom.createElement('div', { className: 'chat-message--image' },
            VDom.createElement('img', {src: require('../../images/chat-image.png'), alt: '' })),
        VDom.createElement('div', { className: 'chat-message--time-and-status' },
            VDom.createElement('time', { className: 'chat-message--time' }, '09:34'))
    )
}

function Popup () {
    return VDom.createElement('div', { className: 'chat-action-popup' },
        VDom.createElement('div', { className: 'window modal' },
            VDom.createElement('form', { },
                VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: '' }),
                VDom.createElement('h2', {className: 'h2' }),
                VDom.createElement('div', { className: 'input-group' },
                    VDom.createElement('label', {}, 'Логин'),
                    VDom.createElement('input', { type: 'text' })),
                VDom.createElement('div', { className: 'error' }),
                VDom.createElement('div', { className: 'modal-bottom' },
                    VDom.createElement('button', { className: 'choice_button', name: 'login', onclick: ChoiceAction }),
                    VDom.createElement('div', { className: 'cancel', onclick: () => {
                            document.querySelector('.chat-action-popup').style.display = 'none'
                        } }, 'Отмена'))))
    )
}

//#########################




