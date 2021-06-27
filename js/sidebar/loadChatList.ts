import BlockClass from "../includes/BlockClass"

class ChatListElementComponent extends BlockClass {
	render(): void {
		const unreadCount = this.props.getProperty('unreadCount')
		const chatEl = this.findChild('.chat')
		if (chatEl && unreadCount !== null) {
			chatEl.classList.add(`unread-${unreadCount}`)
		}

		const unreadCounter = this.findChild('.chat--unread-count')
		if (unreadCounter && unreadCount !== null && unreadCount == 0) {
			unreadCounter.classList.add('hidden')
		}
	}

	init(): void {
		this.element.addEventListener('click', clickHandler.bind(this))
	}
}

// Обработчик клика по диалогу в списке чатов в aside
function clickHandler(this: BlockClass) {
	console.info('Клик по элементу в списке чатов', this)
}

// Фейковые данные для списка чатов
const chats = [
	{
		time: "15:34",
		author: "Евгений Александрович",
		message: "Сегодня в 18:30 собрание в зале заседания",
		unreadCount: 1
	},
	{
		time: "14:10",
		author: "Алена",
		message: "И отправь отчет по ИП Мутыркину. Это в приори...",
		unreadCount: 2
	},
	{
		time: "08:35",
		author: "Марафон 2021",
		message: "Еще остались места! Спешите выгодно приобрести билеты...",
		unreadCount: 0
	},
	{
		time: "Пн",
		author: "Тёма",
		message: "Вы: Предупреди Анатолия Ивановича, что я опаздаю",
		unreadCount: 0
	},
	{
		time: "Сб",
		author: "Игорь",
		message: "Изображение.jpg",
		unreadCount: 0
	},
	{
		time: "Ср",
		author: "Блог Designer",
		message: "Канал от  NTI-systems по обучению рекомендует...",
		unreadCount: 0
	},
	{
		time: "17 Мая 2021",
		author: "A.B.C",
		message: "Больше информации о нашем канале по ссылке https",
		unreadCount: 0
	},
	{
		time: "14 Мая 2021",
		author: "Госуслуги",
		message: "Информация для льготников будет доступна на оф.сайте",
		unreadCount: 0
	}
]


const chatListHandler = new BlockClass('.chat-list--template')
chatListHandler.mountTo('.main-view aside')

chats.forEach(chat => {
	const element = new ChatListElementComponent('.chat-list-item--template', chat, chatListHandler)
	element.bindPropsToElements({
		time: 'time.chat--time',
		author: '.chat--author',
		message: '.chat--message',
		unreadCount: '.chat--unread-count'
	})
})