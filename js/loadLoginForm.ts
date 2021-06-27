import BlockClass from "./includes/BlockClass"

class LoginFormClass extends BlockClass{
    init(){
        //todo добавить обработчик submit
    }
}
const loginForm = new LoginFormClass('.login-form--template')
loginForm.mountTo('body')


