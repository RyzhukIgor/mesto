export default class UserInfo {
    constructor({ usernameSelector, descriptionSelector }) {
        this._username = document.querySelector(usernameSelector);
        this._userDescription = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {
            username: this._username.textContent,
            description: this._userDescription.textContent,
        };
    }

    setUserInfo({ username, description }) {
        this._username.textContent = username;
        this._userDescription.textContent = description;
    }
}
