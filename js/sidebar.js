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

// Скрытие/пока блока-плейсхолдера в строке поиска
function initSearchBarEvents() {
	const searchLine = document.querySelector('.search-line')
	if (!searchLine) {
		return false
	}

	const input = searchLine.querySelector('input')
	if (!input) {
		return false
	}

	input.addEventListener('change', () => {
		input.classList.toggle('with-text', input.value.length > 0)
	})

	input.addEventListener('input', findContact)
}


function findContact() {
	const searchText = this.value
	const searchResultsParent = document.querySelector('aside .search-results')
	const SRTemplate = document.querySelector('.search-result--template')

	if (!searchResultsParent || !SRTemplate) {
		return false
	}

	searchResultsParent.innerHTML = ''

	if (!searchText.length) {
		searchResultsParent.classList.remove('visible')
		return false
	}

	searchResultsParent.classList.add('visible')

	const lowerTextToFind = searchText.toLocaleLowerCase()
	const found = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(lowerTextToFind))

	// Вывод результатов
	found.forEach(contact => {
		const element = SRTemplate.content.cloneNode(true)
		const nameElement = element.querySelector('.search-result--name')

		if (!nameElement) {
			return false
		}

		nameElement.textContent = contact.name
		searchResultsParent.appendChild(element)
	})
}

initSearchBarEvents()