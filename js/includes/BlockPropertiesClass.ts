import { isEqual } from 'lodash'
export { BlockPropertiesClass as default, Properties }

type Properties = {
	[propName: string]: any
}

class BlockPropertiesClass {
	constructor(protected props: Properties) { }

	/**
	 * Получение свойства по имени
	 */
	getProperty(propName: string): any | null {
		return propName in this.props ? this.props[propName] : null
	}

	/**
	 * Получение имён всех установленных свойств
	 */
	getAllPropertyNames(): string[] {
		return Object.keys(this.props)
	}

	/**
	 * Установка значения свойства
	 */
	setProperty(propName: string, propValue: any): void {
		this.props[propName] = propValue
	}

	/**
	 * Сравнение с другим объектом со свойствами
	 */
	equalTo(propsToCompare: Properties): boolean {
		return isEqual(this.props, propsToCompare)
	}
}