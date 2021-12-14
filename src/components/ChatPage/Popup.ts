import { VDom } from '../../my_core/VDom'
import { ChoiceAction } from './ChatPageApi'

export function Popup () {
    return VDom.createElement('div', { className: 'chat-action-popup' },
        VDom.createElement('div', { className: 'window modal' },
            VDom.createElement('form', { },
                VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: '' }),
                VDom.createElement('h2', { className: 'h2' }),
                VDom.createElement('div', { className: 'input-group' },
                    VDom.createElement('label', {}, 'Логин'),
                    VDom.createElement('input', { type: 'text' })),
                VDom.createElement('div', { className: 'error' }),
                VDom.createElement('div', { className: 'modal-bottom' },
                    VDom.createElement('button', { className: 'choice_button', name: 'login', onclick: ChoiceAction }),
                    VDom.createElement('div', { className: 'cancel', onclick: () => {
                            const popup: HTMLElement | null = document.querySelector('.chat-action-popup')
                            if (popup) {
                              popup.classList.remove('open')
                            }
                        } }, 'Отмена'))))
    )
}