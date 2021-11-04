import { loginForm } from "../components/LoginPage/index";
import { registerForm } from "../components/RegisterPage/index";
import { ProfilePage } from "../components/ProfilePage/index";
import BlockClass from '../js/includes/BlockClass'

const ChatPage = new BlockClass('.chat-form--template')

function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {
    const root = document.querySelector(query);
    //root.textContent = block.getContent();
    console.log('Рендер вызван', query, block)
    root.innerHTML = ''
    block.mountTo(query)
    return root;
}

class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        render(this._props.rootQuery, this._blockClass);
        listener(this._pathname)
    }
}

class Router_tmpl {
    constructor(rootQuery) {
        if (Router_tmpl.__instance) {
            return Router_tmpl.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router_tmpl.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event => {
            this._onRoute(event.currentTarget.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

// Необходимо оставить в силу особенностей тренажёра
history.pushState({}, '', '/');

const router = new Router_tmpl(".app");

// Можно обновиться на /user и получить сразу пользователя
router
    .use("/", loginForm) //Страница входа
    .use("/sign-up", registerForm) //Страница регистрации
    .use("/settings", ProfilePage)  //Настройки профиля пользователя
    .use("/messenger", ChatPage) //Чат
    .start();

function listener(pathname) {
    if (pathname === "/") {
        console.log('Мы на странице Логин')
        const button_to_register = document.getElementById('button_to_register')
        button_to_register.addEventListener('click', () => router.go("/sign-up"))

        const button_inter = document.getElementsByTagName('button')[0]
        button_inter.addEventListener('click', () => router.go("/messenger") )
    }
    if (pathname === "/sign-up") {
        const button_to_login = document.getElementById('button_to_login')
        button_to_login.addEventListener('click', () => router.go("/"))
    }
    if (pathname === "/messenger") {
        const button_profile = document.getElementsByTagName('aside')[0].getElementsByTagName("header")[0]
        console.log(button_profile)
        //button_profile.addEventListener('click', () => router.go("/"))
    }



}



//Кнопка перехода со страницы Логин на страницу с Регистрацией

// button.removeEventListener('click', () => router.go("/sign-up"))




//button2.addEventListener('click', router.go("/"))
// setTimeout(() => {
//     router.go("/sign-up");
// }, 1000);

// setTimeout(() => {
//     router.go("/messenger");
// }, 1000);
//
// // А можно и назад
// setTimeout(() => {
//     router.back();
// }, 3000);
//
// // И снова вперёд
// setTimeout(() => {
//     router.forward();
// }, 5000);