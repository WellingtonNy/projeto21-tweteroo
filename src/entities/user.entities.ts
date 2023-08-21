//import

export default class User {

    private _avatar: string
    private _username: string

    constructor(username: string, avatar: string) {
        this._username = username
        this._avatar =   avatar
    }

    get avatar() {

        return this._avatar

    }


    get username() {

        return this._username

    }
}