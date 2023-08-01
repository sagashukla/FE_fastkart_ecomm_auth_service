import { extendObservable } from "mobx";

class UserStore {
    constructor(){
        extendObservable(this, {
            loading: false,
            isLoggedIn: false,
            username: '',
            token: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            userType: ''
        })
    }
}

export default new UserStore();