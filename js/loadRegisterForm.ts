import BlockClass from "./includes/BlockClass"

class RegisterFormClass extends BlockClass{
    init(){
        //todo добавить обработчик submit
    }
}
const registerForm = new RegisterFormClass('.register-form--template')
registerForm.mountTo('body')