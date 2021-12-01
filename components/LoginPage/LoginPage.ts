import { VDom } from "../../my_core/VDom"
import { RouterLink } from "../../my_core/router"
import { login } from "./LoginPageApi";


export default function LoginPage () {
    return VDom.createElement('div', { className: 'site-wrapper hi-contrast-bg'},
        VDom.createElement('div', { className: 'modal' },
            VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger'}),
            VDom.createElement('h2', {}, 'Авторизация'),
            VDom.createElement(LoginForm, {})
        )
    )
}

export function LoginForm () {
    return VDom.createElement('form', { className: 'login' },
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'login' }, 'Логин'),
            VDom.createElement('input', { type: 'text', name: 'login', id: 'login', autofocus: 'true' })
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'password' }, 'Пароль'),
            VDom.createElement('input', { type: 'password', name: 'password', id: 'password'})
        ),
        VDom.createElement('div', { className: 'error' }),
        VDom.createElement('div', { className: 'modal-bottom'},
            VDom.createElement('button', { onclick: login }, 'Войти'),
            VDom.createElement(RouterLink, { text: 'Зарегистрироваться', url: '/sign-up' })
        )
    )
}