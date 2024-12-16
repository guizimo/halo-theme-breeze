var breeze = {
    // 更改主题色
    changeThemeColor: function (color) {
        if (document.querySelector('meta[name="theme-color"]') !== null) {
            document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
        }
    },

    // 自适应主题色
    initThemeColor: function () {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--breeze-background');
        breeze.changeThemeColor(themeColor);
    },

    // 本地存储
    commonLocalStorage: {
        // 设置
        set: function setWithExpiry(key, value, ttl) {
            if (ttl === 0) return
            const now = new Date()
            const expiryDay = ttl * 86400000
            const item = {
                value: value,
                expiry: now.getTime() + expiryDay,
            }
            localStorage.setItem(key, JSON.stringify(item))
        },
        // 获取
        get: function getWithExpiry(key) {
            const itemStr = localStorage.getItem(key)

            if (!itemStr) {
                return undefined
            }
            const item = JSON.parse(itemStr)
            const now = new Date()

            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key)
                return undefined
            }
            return item.value
        }
    }
}