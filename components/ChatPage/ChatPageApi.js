import { state } from '../../my_core/core'
import Router from '../../my_core/router'
import WebSocket from '../../my_core/WebSocket'
import {VDom} from "../../my_core/VDom";
import {ChatHeader} from "./ChatPage";
import {render} from "../../my_core/core";

const host = 'https://ya-praktikum.tech/api/v2'

export async function create_chat (e) {
    e.preventDefault()
    let titleInput = document.getElementsByName('title')[0]
    let title = ''
    if (titleInput) {
        title = titleInput.value
    }

    const create_chatResult = (await fetch(`${host}/chats`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ title }),
    }))

    if (create_chatResult.status !== 200) {
        const error = await create_chatResult.json()
        alert(error.reason)
        return
    }

    const chatsResult = await fetch(`${host}/chats`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.chats = await chatsResult.json()

    Router.get().to('/messenger')

}

export async function selectChat (chat) {
    console.log(chat)
    const onMessage = (message) => {
        console.log(message)
        const messages = JSON.parse(message)
        Array.isArray(messages) ? state.messages.push(...messages.reverse()) : state.messages.push(messages)
        Router.get().to('/messenger')
    }

    state.messages = []

    state.currentChat = chat //Добавляем конкретный чат в state

    const tokenResult = await fetch(`${host}/chats/token/${chat.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })

    const token = await tokenResult.json()

    state.currentChat = chat
    state.webSocket = new WebSocket(state.user.id, chat.id, token.token, onMessage, (v) => { v.getOld() })

    await WhoInThisChat(chat.id)

    localStorage.currentChat = JSON.stringify(chat)

    Router.get().to('/messenger')

}

export async function sendMessage (e) {
    e.preventDefault()
    let messageInput = (document.getElementsByName('message')[0])
    let message = ''
    if (messageInput) {
        message = messageInput.value
    }


    state.webSocket.send(message)
}

export async function getData () {
    const chatsResult = await fetch(`${host}/chats`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.chats = await chatsResult.json()

    const userResult = await fetch(`${host}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.user = await userResult.json()

    Router.get().to('/messenger')
}
export async function ChoiceAction (e) {
    e.preventDefault()
    const choiceButton = document.querySelector('.choice_button').textContent
    choiceButton === 'Добавить' ? await AddOrDeleteUserToChat(e, 'PUT') : await AddOrDeleteUserToChat(e, 'DELETE')

}


export async function AddOrDeleteUserToChat (e, choice) {
    e.preventDefault()
    const loginDiv = document.querySelector('.chat-action-popup')
    const loginInput = loginDiv.getElementsByTagName('input')[0]
    const login = loginInput.value

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

    document.querySelector('.chat-action-popup').style.display = 'none'

    await selectChat(state.currentChat)

}

async function WhoInThisChat (chatId) {
    console.log('WHO')
    const userResult = await fetch(`${host}/chats/${chatId}/users`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.usersInChatAlready = await userResult.json()

    console.log(state.usersInChatAlready)

    state.OnlyUsersInChatAlready = ''
    for (let i in state.usersInChatAlready) {
        state.OnlyUsersInChatAlready += state.usersInChatAlready[i].first_name + '; ';
    }
}

