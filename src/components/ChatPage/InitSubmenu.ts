export function InitSubmenu () {
    interface FooBar extends HTMLLIElement {
        dataAction ?: string
    }

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

    const childrenElement = document.querySelector('.submenu')
    let children
    if (childrenElement) {
        children = childrenElement.querySelectorAll('li')
    }
    const actionTriggerEls = Array.from(children)

    if (actionTriggerEls !== null) {
        actionTriggerEls.forEach((actionTrigger: FooBar) => {
            actionTrigger.addEventListener('click', () => {
                const action: string | undefined = actionTrigger.dataAction
                const availableActions = Object.keys(actionFormValues)
                if (!action || !availableActions.includes(action)) {
                    return true
                }
                const title = actionFormValues[action].formTitle
                const buttonValue = actionFormValues[action].buttonValue

                const popup: HTMLElement | null = document.querySelector('.chat-action-popup')
                if (popup) {
                    const titleElement: HTMLElement | null = popup.querySelector('.h2')
                    if (titleElement) {
                        titleElement.innerText = title
                    }
                    popup.getElementsByTagName('button')[0].textContent = buttonValue
                    popup.classList.add('open')
                }

                if (triggerEl) {
                    triggerEl.classList.remove('open')
                }
            })
        })
    }
}