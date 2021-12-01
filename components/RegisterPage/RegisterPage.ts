import { VDom } from "../../my_core/VDom";
import {RouterLink} from "../../my_core/router";
import {register} from "./RegisterPageApi";


export default function RegisterPage () {
    return VDom.createElement('div', { className: 'site-wrapper hi-contrast-bg'},
        VDom.createElement('div', { className: 'modal' },
            VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger'}),
            VDom.createElement('h2', {}, 'Регистрация'),
            VDom.createElement(RegisterForm, {})
        )
    )
}

export function RegisterForm () {
    return VDom.createElement('form', { className: 'register' },
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'name' }, 'Имя'),
            VDom.createElement('input', { type: 'text', name: 'first_name', id: 'first_name', autofocus: 'true' })
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'name' }, 'Фамилия'),
            VDom.createElement('input', { type: 'text', name: 'second_name', id: 'second_name', autofocus: 'true' })
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'login' }, 'Логин'),
            VDom.createElement('input', { type: 'text', name: 'login', id: 'login'})
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'email' }, 'E-mail'),
            VDom.createElement('input', { type: 'text', name: 'email', id: 'email'})
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'phone' }, 'Телефон'),
            VDom.createElement('input', { type: 'tel', name: 'phone', id: 'phone'})
        ),
        VDom.createElement('div', { className: 'two-columns' },
            VDom.createElement('div', { className: 'input-group' },
                VDom.createElement('label', { for: 'password1' }, 'Пароль'),
                VDom.createElement('input', { type: 'password', name: 'password1', id: 'password1'})
            ),
            VDom.createElement('div', { className: 'input-group' },
                VDom.createElement('label', { for: 'password2' }, 'Пароль'),
                VDom.createElement('input', { type: 'password', name: 'password2', id: 'password2'})
            ),
            VDom.createElement('div', { className: 'error' })
        ),
        VDom.createElement('div', { className: 'modal-bottom'},
            VDom.createElement('button', { onclick: register }, 'Зарегистрироваться'),
            VDom.createElement(RouterLink, { text: 'Уже есть аккаунт?', url: '/' })
        )
    )
}