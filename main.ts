import ChatPage from './components/ChatPage/ChatPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/LoginPage/LoginPage'
import ChangePasswordPage from './components/ChangePasswordPage/ChangePasswordPage'

import Router from './my_core/router'

Router.get()
    .addRoute({
        component: ChangePasswordPage,
        name: 'change_password',
        path: '/change_password'
    })
    .addRoute({
        component: ProfilePage,
        name: 'settings',
        path: '/settings'
    })
    .addRoute({
        component: RegisterPage,
        name: 'sign-up',
        path: '/sign-up'
    })
    .addRoute({
        component: ChatPage,
        name: 'messenger',
        path: '/messenger'
    })
    .addRoute({
        component: LoginPage,
        name: 'index',
        path: '/'
    }).render()