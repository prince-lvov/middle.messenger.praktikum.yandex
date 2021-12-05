import { state } from '../../my_core/core'
import Router from '../../my_core/router'
import WebSocket from '../../my_core/WebSocket'
import HttpTransport from '../../my_core/HttpTransport'
import { Chat, User } from './types'

const host = 'https://ya-praktikum.tech/api/v2'

// export async function create_chat (e: Event) {
//     e.preventDefault()
//     let titleInput: HTMLInputElement = <HTMLInputElement>document.getElementsByName('title')[0]
//     let title: string = ''
//     if (titleInput) {
//         title = titleInput.value
//     }
//     //body: JSON.stringify({ title })
//
//     postChats(title).then(getChats)
//
// }
// export async function postChats (title) {
//
//     const HTTP = new HttpTransport()
//     HTTP.post(`${host}/chats`, { data: JSON.stringify({ title: title }) })
//         .then(
//             (data: XMLHttpRequest) => {
//                 if (data.status !== 200) {
//                     alert(data.response.reason)
//                 } else {
//                     console.log(data.response)
//                 }
//             }
//         )
// }

export async function selectChat (chat: Chat) {
    const onMessage = (message: string) => {
        const messages = JSON.parse(message)
        Array.isArray(messages) ? state.messages.push(...messages.reverse()) : state.messages.push(messages)
        Router.get().to('/messenger')
    }

    state.messages = []
    console.log(chat)
    state.currentChat = chat //Добавляем конкретный чат в state

    const tokenResult = await fetch(`${host}/chats/token/${chat.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })

    const token = await tokenResult.json()

    //const user = state.user as User

    state.currentChat = chat

    state.webSocket = new WebSocket(state.user.id, chat.id, token.token, onMessage, (v) => { v.getOld() })

    await WhoInThisChat(chat.id)

    console.log(chat, JSON.stringify(chat))
    localStorage.currentChat = JSON.stringify(chat)

    Router.get().to('/messenger')

}

export async function sendMessage (e: Event) {
    e.preventDefault()
    let messageInput = <HTMLInputElement> document.getElementsByName('message')[0]
    let message: string = ''
    if (messageInput) {
        message = messageInput.value
    }

    state.webSocket.send(message)
}
export async function getData () {

    getUser().then(getChats).then(function (){
        Router.get().to('/messenger')
        console.log('Привет')}
    )


}

export async function getChats () {
    const HTTP = new HttpTransport()
    return HTTP.get(`${host}/chats`, {})
        .then(
            (data: XMLHttpRequest) => {
                if (data.status !== 200) {
                    alert(data.response.reason)
                } else {
                    state.chats = data.response
                    console.log(state.chats)
                    //Router.get().to('/messenger')
                }
            }
        )
}
export async function getUser () {
    const HTTP = new HttpTransport()
    return HTTP.get(`${host}/auth/user`, {})
        .then(
            (data: XMLHttpRequest) => {
                if (data.status !== 200) {
                    alert(data.response.reason)
                } else {
                    state.user = data.response
                    console.log(state.user)
                }
            }
        )
}
//Router.get().to('/messenger')

export async function ChoiceAction (e: Event) {
    e.preventDefault()
    const choiceButton: string = document.querySelector('.choice_button').textContent
    if (choiceButton === 'Добавить') {
        await AddOrDeleteUserToChat(e, 'PUT')
    } else {
        await AddOrDeleteUserToChat(e, 'DELETE')
    }
}


export async function AddOrDeleteUserToChat (e: Event, choice: string) {
    e.preventDefault()
    const loginDiv: HTMLElement = document.querySelector('.chat-action-popup')
    const loginInput: HTMLInputElement = loginDiv.getElementsByTagName('input')[0]
    const login: string = loginInput.value

    const SearchUserByLogin = (await fetch(`${host}/user/search`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ login }),
    }))

    if (SearchUserByLogin.status !== 200) {
        const error = await SearchUserByLogin.json()
        alert(error.reason)
        return
    }

    const SearchUserByLoginResult = await SearchUserByLogin.json()
    const users = []
    users.push(SearchUserByLoginResult[0].id)
    state.userInChat = SearchUserByLoginResult[0]

    const chatId = state.currentChat.id

    const addUsersToChat = (await fetch(`${host}/chats/users`, {
        method: `${choice}`,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            users,
            chatId
        }),
    }))

    if (addUsersToChat.status !== 200) {
        const error = await addUsersToChat.json()
        alert(error.reason)
        return
    }

    document.querySelector('.chat-action-popup').classList.remove('open')

    await selectChat(state.currentChat)

}

async function WhoInThisChat (chatId) {

    const userResult = await fetch(`${host}/chats/${chatId}/users`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.usersInChatAlready = await userResult.json()

    state.OnlyUsersInChatAlready = ''
    for (let i in state.usersInChatAlready) {
        state.OnlyUsersInChatAlready += state.usersInChatAlready[i].first_name + '; ';
    }
}

