export function InitSubmenu () {

    const triggerEl = document.querySelector('.chat-menu')
    if (triggerEl) {
        triggerEl.classList.toggle('open')
    }

    const actionFormValues = {
        addUser: {
            formTitle: 'Добавить пользователя',
            buttonValue: 'Добавить'
        },
        removeUser: {
            formTitle: 'Удалить пользователя',
            buttonValue: 'Удалить'
        },
        deleteChat: {
            formTitle: 'Удалить чат с пользователем',
            buttonValue: 'Удалить'
        }
    }

    const children = document.querySelector('.submenu').querySelectorAll('li')
    const actionTriggerEls = Array.from(children)

    if (actionTriggerEls !== null) {
        actionTriggerEls.forEach(actionTrigger => {
            actionTrigger.addEventListener('click', () => {
                const action = actionTrigger.dataAction
                const availableActions = Object.keys(actionFormValues)
                if (!action || !availableActions.includes(action)) {
                    return true
                }
                const title = actionFormValues[action].formTitle
                const buttonValue = actionFormValues[action].buttonValue

                const popup = document.querySelector('.chat-action-popup')
                popup.querySelector('.h2').innerText = title
                popup.getElementsByTagName('button')[0].textContent = buttonValue
                popup.style.display = 'block'

                if (triggerEl) {
                    triggerEl.classList.remove('open')
                }
            })
        })
    }
}