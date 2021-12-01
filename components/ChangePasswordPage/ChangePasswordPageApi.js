import {state} from "../../my_core/core";
import Router from "../../my_core/router";

const host = 'https://ya-praktikum.tech/api/v2'

export async function change_password (e) {
    e.preventDefault()
    const oldPassword = (document.getElementsByName('oldPassword')[0]).value
    const newPassword = (document.getElementsByName('newPassword')[0]).value

    const change_passwordResult = (await fetch(`${host}/user/password`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            oldPassword,
            newPassword,
        }),
    }))

    if (change_passwordResult.status !== 200) {
        const error = await change_passwordResult.json()
        alert(error.reason)
        return
    }

    alert('Пароль изменен!')

}