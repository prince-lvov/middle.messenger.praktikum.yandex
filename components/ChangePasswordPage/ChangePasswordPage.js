import { VDom } from "../../my_core/VDom";
import { state } from '../../my_core/core'
import { loadAvatar } from "../ProfilePage/ProfilePageApi";
import { change_password } from "./ChangePasswordPageApi";
import Router from "../../my_core/router";

export default function ChangePasswordPage () {

    const avatar = [
        VDom.createElement('input', { type: 'file', onchange: loadAvatar })
    ]

    if (state.user.avatar) avatar.unshift(
        VDom.createElement('img', { src: 'https://ya-praktikum.tech/api/v2/resources' + state.user.avatar })
    )

    return VDom.createElement('div', { className: 'site-wrapper profile-view' },
        VDom.createElement('a', { className: 'back-link', onclick: (e) => {
                    e.preventDefault()
                    Router.get().to('/settings')
                } },
            VDom.createElement('div', { className: 'arrow' },
                VDom.createElement('img', { src: require('../../images/back-arrow.svg'), alt: ''}))
        ),
        VDom.createElement('div', { className: 'center_class' },
            VDom.createElement('div', { className: state.user.avatar ? 'big_avatar with_avatar' : 'big_avatar' }, avatar),
            VDom.createElement('div', { className: 'new_name' }, state.user?.first_name),
            VDom.createElement('div',{ className: 'profile_field' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Старый пароль'),
                VDom.createElement('input', { className: 'field_data', type: 'password', name: 'oldPassword', value: ''})),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Новый пароль'),
                VDom.createElement('input', { className: 'field_data', type: 'password', name: 'newPassword', value: '' })),
            VDom.createElement('button',{ className: 'green_button_exit', onclick : change_password }, 'Сохранить' ),
        )
    )
}