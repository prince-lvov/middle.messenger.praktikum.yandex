import BlockClass from '../../js/includes/BlockClass'

const SidebarSearchResults = new BlockClass('.search-results--template')

const contacts = [
    { name: "Анастасия Банк" },
    { name: "Георгий Север" },
    { name: "Дмитрий Запад" },
    { name: "Елена Крым" },
    { name: "Павел Никифорович" },
    { name: "Клим Жучинский" },
    { name: "Антон Кириллович Мезинцев" }
]

// Поиск контакта по событию input в поле ввода имени
function findContacts(this: HTMLInputElement) {
    const searchText: string = this.value.toLocaleLowerCase()

    SidebarSearchResults.clear()
    SidebarSearchResults.element.classList.remove('visible')

    if (!searchText.length) {
        SidebarSearchResults.element.classList.remove('visible')
        return false
    }
    SidebarSearchResults.element.classList.add('visible')

    const found = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(searchText))

    // Вывод результатов
    found.forEach(contact => {
        const contactNode = new BlockClass('.search-result--template', contact, SidebarSearchResults)
        contactNode.bindPropsToElements({
            name: '.search-result--name'
        })
    })
}

export  { SidebarSearchResults, findContacts }