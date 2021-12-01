import {state} from "../../my_core/core";
import Router from "../../my_core/router";

const host = 'https://ya-praktikum.tech/api/v2'

export async function login (e) {
    e.preventDefault()
    const loginInput = (document.getElementsByName('login')[0]) as HTMLInputElement
    const login = loginInput.value
    const passwordInput = (document.getElementsByName('password')[0]) as HTMLInputElement
    const password = passwordInput.value



    const loginResult = (await fetch(`${host}/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    }))

    if (loginResult.status !== 200) {
        const error = await loginResult.json()
        alert(error.reason)
        return
    }

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