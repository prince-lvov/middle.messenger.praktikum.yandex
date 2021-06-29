type validationCondition = {
	callback: (value: string) => boolean,
	errorMessage: string
}

type conditionsObject = {
	[confitionName: string]: validationCondition
}

const validationConditioins: conditionsObject = {
	passwordLength: {
		callback: (value: string) => value.length > 7,
		errorMessage: 'Пароль должен быть не короче 8 символов'
	},

	passwordSymbols: {
		callback: (value: string) => /[A-Z]/.test(value) && /\d/.test(value) && /[a-z]/.test(value),
		errorMessage: 'Пароль должен содержать только буквы латинского алфавита, хотя бы одну цифру, одну строчную и одну прописную букву'
	},

	firstAndLastName: {
		callback: (value: string) => /^[а-яё]+ [а-яё]+$/i.test(value),
		errorMessage: 'Нужно указать имя и фамилию'
	},

	loginSymbols: {
		callback: (value: string) => /^[a-z0-9_]+$/i.test(value),
		errorMessage: 'Логин может содержать латинские символы, цифры и знак _'
	},

	phoneSymbols: {
		callback: (value: string) => /^\+?[0-9\(\)-]+$/.test(value),
		errorMessage: 'Номер телефона может содержать цифры, скобки, пробелы и знак -'
	}
}

export { validationConditioins as default, validationCondition }