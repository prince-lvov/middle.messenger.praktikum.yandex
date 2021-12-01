// ./node_modules/.bin/mocha --require ts-node/register components/**/*.spec.ts

import {VDom} from "../../my_core/VDom";
import {render} from "../../my_core/core"
import { LoginForm } from "./LoginPage";

import { assert } from "chai";
import { JSDOM } from "jsdom"

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>');
global.document = dom.window.document;

describe('LoginForm component', () => {

    it('Render fields on the Login Form', () => {

        const container = document.createElement('div')

        render(
            VDom.createElement(LoginForm, {}),
            container
        )

        const loginLabelElement = container.getElementsByTagName('label')[0]
        const loginInputElement = container.getElementsByTagName('input')[0]
        const passwordLabelElement = container.getElementsByTagName('label')[1]
        const passwordInputElement = container.getElementsByTagName('input')[1]

        const buttonSignInElement = container.getElementsByTagName('button')[0]
        const buttonSignUpElement = container.getElementsByTagName('button')[1]

        assert.equal(loginLabelElement.textContent, 'Логин')
        assert.equal(loginInputElement.id, 'login')
        assert.equal(passwordLabelElement.textContent, 'Пароль')
        assert.equal(passwordInputElement.id, 'password')
        assert.equal(buttonSignInElement.textContent, 'Войти')
        assert.equal(buttonSignUpElement.textContent, 'Зарегистрироваться')

    })

})