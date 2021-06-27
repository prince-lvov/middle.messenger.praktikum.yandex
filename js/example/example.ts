import BlockClass from '../includes/BlockClass'

class ButtonWithTitle extends BlockClass {
	init(): void {
		const buttonEl = this.findChild('button')
		if (buttonEl) {
			buttonEl.addEventListener('click', buttonClickHandler.bind(this))
		}
	}
}


class ButtonWithTitle2 extends BlockClass {
	init(): void {
		const buttonEl = this.findChild('button')
		if (buttonEl) {
			buttonEl.addEventListener('click', buttonOtherClickHandler.bind(this))
		}
	}
}

let component2: BlockClass
document.addEventListener('DOMContentLoaded', () => {
	// Блок с кнопкой сразу монтируется
	const button = new ButtonWithTitle('.titleAndButton', {
		title: '1200 рублей',
		buttonValue: 'Можно нажать кнопку'
	}, '.app')
	button.bindPropsToElements({
		title: '.title',
		buttonValue: 'button'
	})


	// Ещё один блок с кнопкой, из другого класса. Ручное монтирование
	component2 = new ButtonWithTitle2('.titleAndButton', {
		title: 'Второй заголовок'
	})
	component2.mountTo('.app')
	component2.bindPropsToElements({ title: '.title', buttonValue: 'button' })
	component2.setProps({ buttonValue: 'Эта кнопка тоже работает' })
})


function buttonClickHandler(this: BlockClass, event: Event) {
	event.preventDefault()

	this.setProps({ title: 'Кнопка нажата!' })
	component2.show()
}

function buttonOtherClickHandler(this: BlockClass, event: Event) {
	event.preventDefault()

	this.hide()
}