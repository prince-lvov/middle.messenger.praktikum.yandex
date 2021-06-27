import BlockClass from "../includes/BlockClass"

class SearchLineComponent extends BlockClass {
	init(): void {
		const inputField = this.findChild('input[type="search"]') as HTMLInputElement
		if (inputField) {
			inputField.addEventListener('change', () => {
				inputField.classList.toggle('with-text', inputField.value.length > 0)
			})

			inputField.addEventListener('input', findContacts)
		}
	}
}


const header = new BlockClass('.sidebar-header--template')
header.mountTo('.main-view aside')

const searchLine = new SearchLineComponent('.search-line--template')
searchLine.mountTo(header)

const searchResults = new BlockClass('.search-results--template')
searchResults.mountTo('.main-view aside')

// Контакты, среди которых будет производиться поиск
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

	searchResults.clear()
	searchResults.element.classList.remove('visible')

	if (!searchText.length) {
		searchResults.element.classList.remove('visible')
		return false
	}
	searchResults.element.classList.add('visible')

	const found = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(searchText))

	// Вывод результатов
	found.forEach(contact => {
		const contactNode = new BlockClass('.search-result--template', contact, searchResults)
		contactNode.bindPropsToElements({
			name: '.search-result--name'
		})
	})
}