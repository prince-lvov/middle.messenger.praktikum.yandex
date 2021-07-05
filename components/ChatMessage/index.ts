import BlockClass from '../../js/includes/BlockClass'
import { messagesBody } from '../MessagesBody/index'

class MessageClass extends BlockClass {
	render(): void {
		const isMyMessage = this.props.getProperty('my') as boolean
		if (isMyMessage) {
			this.element.classList.add('is-my-message')
		}

		const statusEl = this.findChild('.chat-message--status')
		const readStatus = this.props.getProperty('read') as boolean
		if (statusEl && readStatus) {
			statusEl.classList.add('visible')
		}

		// Если сообщение имеет тип image, то в параметре image находится ссылку на картинку
		// parcel такую картинку не обрабатывает, поэтому нужно использовать внешнюю ссылку
		const messageType = this.props.getProperty('type')
		const imgEl = this.findChild('.chat-message--image img') as HTMLImageElement
		if (messageType === 'image' && imgEl) {
			const imageSrc = this.props.getProperty('image')

			if (imageSrc) {
				imgEl.src = `${imageSrc}`
			}
		}
	}
}

type Message = {
	my: boolean,    // Флаг того, что пользователь - автор сообщения
	read: boolean,  // Флаг прочитанного сообщения
	type: 'text' | 'image', // Тип сообщения
	text?: string,  // Текст сообщения типа 'text'
	image?: string, // Имя файла картинки в сообщении типа 'image'
	time: string    // Время отправки сообщения
}

const messagesList: Message[] = [
	{
		my: true,
		read: true,
		type: 'text',
		text: 'Добрый день! Жду от вас схему проезда, заранее спасибо!',
		time: '09:12'
	},
	{
		my: false,
		read: false,
		type: 'text',
		text: 'Здравствуйте, ок.',
		time: '09:34'
	},
	{
		my: false,
		read: false,
		type: 'image',
		image: 'https://c1.staticflickr.com/1/185/456615533_1a8c50c266_m.jpg',
		time: '09:34'
	}
]

// Сообщения в чате
messagesList.forEach(msg => {
	const messageComponent = new MessageClass(`.chat-${msg.type}-message--template`, msg, messagesBody)
	messageComponent.bindPropsToElements({
		text: '.chat-message--text',
		time: '.chat-message--time'
	})
})