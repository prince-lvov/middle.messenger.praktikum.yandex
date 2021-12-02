import { VDom } from '../../my_core/VDom'
import { state } from '../../my_core/core'
import { getData, selectChat } from './ChatPageApi'
import { Sidebar } from './Sidebar'
import { ChatPageWithChat } from './ChatPageWithChat'
import { Popup } from './Popup'

export default function ChatPage () {
    if (!state.user.id) {
        getData().then(() => {
            if (localStorage.currentChat && !state.currentChat) {
                selectChat(JSON.parse(localStorage.currentChat))
            }
        })
    }

    const children = state.currentChat ? [
        VDom.createElement(Sidebar, { chats: state.chats }),
        VDom.createElement(ChatPageWithChat),
        VDom.createElement(Popup)
    ] : [
        VDom.createElement(Sidebar, { chats: state.chats }),
        VDom.createElement(Popup)
    ]
    return VDom.createElement('div', { className: 'site-wrapper main-view' }, children)
}







