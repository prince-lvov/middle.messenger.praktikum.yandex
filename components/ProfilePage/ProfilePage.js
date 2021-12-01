import { VDom } from "../../my_core/VDom";
import { state } from '../../my_core/core'
import {save, loadAvatar, logout, getDataProfile} from "./ProfilePageApi";
import Router from "../../my_core/router";
import {selectChat, getData} from "../ChatPage/ChatPageApi";


export default function ProfilePage () {

    if (!state.user) getDataProfile().then(() => {

    })

    const avatar = [
        VDom.createElement('input', { type: 'file', onchange: loadAvatar })
    ]

    if (state.user.avatar) avatar.unshift(
        VDom.createElement('img', { src: 'https://ya-praktikum.tech/api/v2/resources' + state.user.avatar })
    )

    return VDom.createElement('div', { className: 'site-wrapper profile-view' },
        VDom.createElement('a', { className: 'back-link', onclick: (e) => {
                    e.preventDefault()
                    Router.get().to('/messenger')
                } },
            VDom.createElement('div', { className: 'arrow' },
                VDom.createElement('img', { src: require('../../images/back-arrow.svg'), alt: ''}))
        ),
        VDom.createElement('div', { className: 'center_class' },
            VDom.createElement('div', { className: state.user.avatar ? 'big_avatar with_avatar' : 'big_avatar' }, avatar),
            VDom.createElement('div', { className: 'new_name' }, state.user?.first_name),
            VDom.createElement('div',{ className: 'profile_field' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Имя'),
                VDom.createElement('input', { className: 'field_data', name: 'first_name', value: state.user?.first_name})),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Фамилия'),
                VDom.createElement('input', { className: 'field_data', name: 'second_name', value: state.user?.second_name })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Отображаемое имя'),
                VDom.createElement('input', { className: 'field_data', name: 'display_name', value: state.user?.display_name })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Логин'),
                VDom.createElement('input', { className: 'field_data', name: 'login', value: state.user?.login })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Телефон'),
                VDom.createElement('input', { className: 'field_data', name: 'phone', value: state.user?.phone })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Почта'),
                VDom.createElement('input', { className: 'field_data', name: 'email', value: state.user?.email })),
            VDom.createElement('button',{ className: 'green_button_exit', onclick: save }, 'Изменить данные' ),
            VDom.createElement('button',{ className: 'green_button_exit', onclick: (e) => {
                    e.preventDefault()
                    Router.get().to('/change_password')
                }  }, 'Изменить пароль'),
            VDom.createElement('button', { className: 'green_button_exit', onclick: logout }, 'Выйти')
        )
    )
}
