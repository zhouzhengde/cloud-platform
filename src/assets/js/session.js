export default {
    key: '_smart_design:current_user:login_info_',
    /**
     * 获取当前用户会话信息
     * @returns {*}
     */
    getUserInfo: function () {
        let jsonValue = localStorage.getItem(this.key);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return null;
    },
    /**
     * 设置用户会话
     * @param userInfo
     */
    setUserInfo: function (userInfo) {
        if (userInfo) {
            localStorage.setItem(this.key, JSON.stringify(userInfo));
        }
    },
    /**
     * 清除会话信息
     */
    logout: function () {
        localStorage.removeItem(this.key);
    }
}