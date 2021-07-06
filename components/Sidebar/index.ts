import { SidebarHeader } from '../SidebarHeader/index'
import { SidebarSearchResults } from '../SidebarSearchResults/index'
import { SidebarSearch } from '../SidebarSearch/index'
import { ChatlistArea } from '../ChatlistArea/index'
import { ChatListElementComponent } from '../ChatlistItems/index'

SidebarHeader.mountTo('.main-view aside')
SidebarSearch.mountTo(SidebarHeader)
SidebarSearchResults.mountTo('.main-view aside')
ChatlistArea.mountTo('.main-view aside')

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

chats.forEach(chat => {
    const element = new ChatListElementComponent('.chat-list-item--template', chat, ChatlistArea)
    element.bindPropsToElements({
        time: 'time.chat--time',
        author: '.chat--author',
        message: '.chat--message',
        unreadCount: '.chat--unread-count'
    })
})