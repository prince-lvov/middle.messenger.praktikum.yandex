import { state } from '../../my_core/core';
import Router from '../../my_core/router';

const host = 'https://ya-praktikum.tech/api/v2'

export async function save (e) {
    e.preventDefault()
    const first_name = (document.getElementsByName('first_name')[0] as HTMLInputElement).value
    const second_name = (document.getElementsByName('second_name')[0] as HTMLInputElement).value
    const login = (document.getElementsByName('login')[0] as HTMLInputElement).value
    const email = (document.getElementsByName('email')[0] as HTMLInputElement).value
    const phone = (document.getElementsByName('phone')[0] as HTMLInputElement).value
    const display_name = (document.getElementsByName('display_name')[0] as HTMLInputElement).value

    const saveResult = (await fetch(`${host}/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone
        }),
    }))

    if (saveResult.status !== 200) {
        const error = await saveResult.json()
        alert(error.reason)
        return
    }

    alert('Успешно сохранено!')

    const user = state.user as any

    user.first_name = first_name
    user.seconds_name = second_name
    user.display_name = display_name
    user.login = login
    user.email = email
    user.phone = phone
}

export async function getDataProfile () {
    const userResult = await fetch(`${host}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.user = await userResult.json()

    Router.get().to('/settings')
}

export async function loadAvatar (e) {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('avatar', file)
    const response = await fetch(host + '/user/profile/avatar', { method: 'PUT', mode: 'cors', credentials: 'include', body: formData })
    const result = await response.json()

    const user = state.user as any

    user.avatar = result.avatar
    Router.get().to('/settings')
}

export async function logout () {
    const logoutResult = (await fetch(`${host}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    }))

    if (logoutResult.status !== 200) {
        const error = await logoutResult.json()
        alert(error.reason)
        return
    }

    Router.get().to('/')
}