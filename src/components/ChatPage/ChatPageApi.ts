import { state } from '../../my_core/core'
import Router from '../../my_core/router'
import WebSocket from '../../my_core/WebSocket'
import HttpTransport from '../../my_core/HttpTransport'
import { Chat, User } from './types'

const host = 'https://ya-praktikum.tech/api/v2'

export async function create_chat (e: Event) {
    e.preventDefault()
    let titleInput: HTMLInputElement = <HTMLInputElement>document.getElementsByName('title')[0]
    let title: string = ''
    if (titleInput) {
        title = titleInput.value
    }

    postChats(title).then(getChats).then(() => {
        Router.get().to('/messenger')
    })
}
export async function postChats (title) {

    const HTTP = new HttpTransport()
    new Promise<void>((resolve, reject) => {
        HTTP.post(`${host}/chats`, { data: JSON.stringify({ title: title }) })
            .then((data: XMLHttpRequest) => {
                    console.log(data.response)
                }
            ).catch((r) => {
            console.log('Упал с ошибкой', r)
            reject()
        })
    })
}

export async function selectChat (chat: Chat) {
    const onMessage = (message: string) => {
        const messages = JSON.parse(message)
        Array.isArray(messages) ? state.messages.push(...messages.reverse()) : state.messages.push(messages)
        Router.get().to('/messenger')
    }

    state.messages = []

    state.currentChat = chat

    let tokenResult
    try {
        tokenResult = await fetch(`${host}/chats/token/${chat.id}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        })
    }catch(error) {
        console.log('Ошибка запроса', error)
    }

    const token = await tokenResult.json()

    state.currentChat = chat

    state.webSocket = new WebSocket(state.user.id, chat.id, token.token, onMessage, (v) => { v.getOld() })

    await WhoInThisChat(chat.id)

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

    state.webSocket?.send(message)
}
export async function getData () {
    return new Promise<void> ((resolve, reject) => {
        getUser().then(getChats).then(() => {
                Router.get().to('/messenger')
                resolve()
            }
        )
    })
}

export async function getChats () {
    const HTTP = new HttpTransport()
    return new Promise<void>((resolve, reject) => {
        HTTP.get(`${host}/chats`, {})
            .then((data: XMLHttpRequest) => {
                    state.chats = data.response
                    resolve()
                }
            ).catch((r) => {
                console.log('Упал с ошибкой', r)
                reject()
        })
    })
}
export async function getUser () {
    const HTTP = new HttpTransport()
    return new Promise<void> ((resolve, reject) => {
        HTTP.get(`${host}/auth/user`, {})
            .then((data: XMLHttpRequest) => {
                        state.user = data.response
                        resolve()
                }
            ).catch((r) => {
            console.log('Упал с ошибкой', r)
            reject()
        })
    })
}

export async function ChoiceAction (e: Event) {
    e.preventDefault()
    const choiceButtonElement = document.querySelector('.choice_button')
    let choiceButton
    if (choiceButtonElement) {
        choiceButton = choiceButtonElement.textContent
    }
    if (choiceButton === 'Добавить') {
        await AddOrDeleteUserToChat(e, 'PUT')
    } else {
        await AddOrDeleteUserToChat(e, 'DELETE')
    }
}


export async function AddOrDeleteUserToChat (e: Event, choice: string) {
    e.preventDefault()

    const loginDiv: HTMLElement | null = document.querySelector('.chat-action-popup')
    let login: string = ''
    if (loginDiv) {
        const loginInput: HTMLInputElement | null = loginDiv.getElementsByTagName('input')[0]
        login = loginInput.value
    }

    let SearchUserByLogin
    try{
        SearchUserByLogin = (await fetch(`${host}/user/search`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ login }),
        }))
    }catch(error) {
        console.log('Ошибка запроса', error)
    }

    if (SearchUserByLogin.status !== 200) {
        const error = await SearchUserByLogin.json()
        alert(error.reason)
        return
    }

    const SearchUserByLoginResult: User[] = await SearchUserByLogin.json()
    const users: number[] = []

    users.push(SearchUserByLoginResult[0].id)
    state.userInChat = SearchUserByLoginResult[0]

    const chatId = state.currentChat.id
    let addUsersToChat

    try {
         addUsersToChat = (await fetch(`${host}/chats/users`, {
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
    }catch(error) {
        console.log('Ошибка запроса', error)
    }


    if (addUsersToChat.status !== 200) {
        const error = await addUsersToChat.json()
        alert(error.reason)
        return
    }

    const popup = document.querySelector('.chat-action-popup')
    if (popup) {
        popup.classList.remove('open')
    }

    await selectChat(state.currentChat)

}

async function WhoInThisChat (chatId) {

    let userResult
    try{
        userResult = await fetch(`${host}/chats/${chatId}/users`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
    }catch(error) {
        console.log('Ошибка запроса', error)
    }


    state.usersInChatAlready = await userResult.json()
    state.OnlyUsersInChatAlready = ''
    for (let i in state.usersInChatAlready) {
        state.OnlyUsersInChatAlready += state.usersInChatAlready[i].first_name + '; ';
    }
}

