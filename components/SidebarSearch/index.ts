import BlockClass from '../../js/includes/BlockClass'
import { findContacts } from '../SidebarSearchResults/index'

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

export const SidebarSearch = new SearchLineComponent('.search-line--template')