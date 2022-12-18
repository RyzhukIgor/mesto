export default class UserInfo {
    constructor({ usernameSelector, descriptionSelector, avatarSelector }) {
        this._username = document.querySelector(usernameSelector);
        this._userDescription = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
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

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = 'аватар пользователя';
    }
}
