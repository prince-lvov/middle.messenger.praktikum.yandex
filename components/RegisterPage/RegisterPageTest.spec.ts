// ./node_modules/.bin/mocha --require ts-node/register components/**/*.spec.ts

import {VDom} from "../../my_core/VDom";
import {render} from "../../my_core/core"
import { RegisterForm } from "./RegisterPage";

import { assert } from "chai";
import { JSDOM } from "jsdom"

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>');
global.document = dom.window.document;

describe('RegisterForm component', () => {

    it('Render fields on the Register Form', () => {

        const container = document.createElement('div')

        render(
            VDom.createElement(RegisterForm, {}),
            container
        )

        const first_nameLabelElement = container.getElementsByTagName('label')[0]
        const first_nameInputElement = container.getElementsByTagName('input')[0]
        const second_nameLabelElement = container.getElementsByTagName('label')[1]
        const second_nameInputElement = container.getElementsByTagName('input')[1]
        const loginLabelElement = container.getElementsByTagName('label')[2]
        const loginInputElement = container.getElementsByTagName('input')[2]
        const emailLabelElement = container.getElementsByTagName('label')[3]
        const emailInputElement = container.getElementsByTagName('input')[3]
        const phoneLabelElement = container.getElementsByTagName('label')[4]
        const phoneInputElement = container.getElementsByTagName('input')[4]
        const password1LabelElement = container.getElementsByTagName('label')[5]
        const password1InputElement = container.getElementsByTagName('input')[5]
        const password2LabelElement = container.getElementsByTagName('label')[6]
        const password2InputElement = container.getElementsByTagName('input')[6]
        const buttonSignUpElement = container.getElementsByTagName('button')[0]
        const buttonSignInElement = container.getElementsByTagName('button')[1]

        assert.equal(first_nameLabelElement.textContent, 'Имя')
        assert.equal(first_nameInputElement.id, 'first_name')
        assert.equal(second_nameLabelElement.textContent, 'Фамилия')
        assert.equal(second_nameInputElement.id, 'second_name')
        assert.equal(loginLabelElement.textContent, 'Логин')
        assert.equal(loginInputElement.id, 'login')
        assert.equal(emailLabelElement.textContent, 'E-mail')
        assert.equal(emailInputElement.id, 'email')
        assert.equal(phoneLabelElement.textContent, 'Телефон')
        assert.equal(phoneInputElement.id, 'phone')
        assert.equal(password1LabelElement.textContent, 'Пароль')
        assert.equal(password1InputElement.id, 'password1')
        assert.equal(password2LabelElement.textContent, 'Пароль')
        assert.equal(password2InputElement.id, 'password2')
        assert.equal(buttonSignUpElement.textContent, 'Зарегистрироваться')
        assert.equal(buttonSignInElement.textContent, 'Уже есть аккаунт?')

    })

})