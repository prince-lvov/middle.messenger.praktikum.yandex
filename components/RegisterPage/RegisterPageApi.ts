import Router from "../../my_core/router";
import { logout } from "../ProfilePage/ProfilePageApi"

const host = 'https://ya-praktikum.tech/api/v2'

export async function register (e) {
    e.preventDefault()
    const first_nameInput = (document.getElementsByName('first_name')[0]) as HTMLInputElement
    const first_name = first_nameInput.value
    const second_nameInput = (document.getElementsByName('second_name')[0]) as HTMLInputElement
    const second_name = second_nameInput.value
    const loginInput = (document.getElementsByName('login')[0]) as HTMLInputElement
    const login = loginInput.value
    const emailInput = (document.getElementsByName('email')[0]) as HTMLInputElement
    const email = emailInput.value
    const phoneInput = (document.getElementsByName('phone')[0]) as HTMLInputElement
    const phone = phoneInput.value
    const password1Input = (document.getElementsByName('password1')[0]) as HTMLInputElement
    const password1 = password1Input.value
    const password2Input = (document.getElementsByName('password2')[0])as HTMLInputElement
    const password2 = password2Input.value

    const registerResult = (await fetch(`${host}/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            first_name,
            second_name,
            login,
            email,
            phone,
            password: password1
        }),
    }))

    if (registerResult.status !== 200) {
        const error = await registerResult.json()
        alert(error.reason)
        return
    }

    alert('Регистрация успешна!')

    await logout()

    Router.get().to('/')
}