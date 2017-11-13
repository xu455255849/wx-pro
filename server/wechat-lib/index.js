import request from 'request-promise'

const baseUrl = 'https://api.weixin.qq.com/cgi-bin/'

const api = {
    access_token: baseUrl + 'token?grant_type=client_credential',
    user: {
        remark: baseUrl + 'user/info/updateremark?',
        info: baseUrl + 'user/info?',
        batchInfo: baseUrl + 'user/info/batchget?',
        fetchUserList: baseUrl + 'user/get?',
        getBlackList: baseUrl + 'tags/members/getblacklist?',
        batchBlackUsers: baseUrl + 'tags/members/batchblacklist?',
        batchUnblackUsers: baseUrl + 'tags/members/batchunblacklist?'
    },
}

export default class Wechat {
    constructor (opts) {
        this.opts = Object.assign({}, opts)
        
        this.appID = opts.appID
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
        this.fetchAccessToken()
    }
    
    async request (options) {
        options = Object.assign({}, options, {json: true})
        
        try {
            const res = await request(options)
            console.log(res)
            return res
        } catch(err) {
            console.log(err)
        }
    }
    
    async fetchAccessToken () {
        let data = await this.getAccessToken()
        
        if (!this.isValidToken(data, 'access_token')) {
            data = await this.updateAccessToken()
        }
        
        await this.saveAccessToken(data)
        
        return data
    }
    
    async updateAccessToken () {
        const url = api.access_token + '&appid=' + this.appID + '&secret=' + this.appSecret
        const data = await this.request({ url: url})
        const now = (new Date().getTime());
        const expiresIn = now + (data.expires_in - 20) * 1000;
        data.expires_in = expiresIn
        
        return data
    }
    
    isValidToken (data, name) {
        if (!data || !data[name] || !data.expires_in) {
            return false
        }
        
        const expiresIn = data.expires_in
        const now = (new Date().getTime())
        
        if (now < expiresIn) {
            return true
        } else {
            return false
        }
    }
    
    getUserInfo (token, openId, lang) {
        const url = `${api.user.info}access_token=${token}&openid=${openId}&lang=${lang || 'zh_CN'}`
        
        return {url: url}
    }
    batchUserInfo (token, userList) {
        const url = api.user.batchInfo + 'access_token=' + token
        const form = {
            user_list: userList
        }
        
        return {method: 'POST', url: url, body: form}
    }
    
    fetchUserList (token, openId) {
        const url = `${api.user.fetchUserList}access_token=${token}&next_openid=${openId || ''}`
        
        return {url: url}
    }
    
    createMenu (token, menu) {
        const url = api.menu.create + 'access_token=' + token
        
        return {method: 'POST', url: url, body: menu}
    }
    
    getMenu (token) {
        const url = api.menu.get + 'access_token=' + token
        
        return {url: url}
    }
    
    delMenu (token) {
        const url = api.menu.del + 'access_token=' + token
        
        return {url: url}
    }
    
    addConditionMenu (token, menu, rule) {
        const url = api.menu.addCondition + 'access_token=' + token
        const form = {
            button: menu,
            matchrule: rule
        }
        
        return {method: 'POST', url: url, body: form}
    }
    
    delConditionMenu (token, menuId) {
        const url = api.menu.delCondition + 'access_token=' + token
        const form = {
            menuid: menuId
        }
        
        return {method: 'POST', url: url, body: form}
    }
    
    getCurrentMenuInfo (token) {
        const url = api.menu.getInfo + 'access_token=' + token
        
        return {url: url}
    }
    
    sign (ticket, url) {
        return sign(ticket, url)
    }
    
    
    
    
}