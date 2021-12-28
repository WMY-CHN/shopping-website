import { nanoid } from 'nanoid'

//生成随机数，并进行持久性储存，用于游客ID
export const getUID = () => {
    //获取本地存储UID
    let uid_token = localStorage.getItem('UIDTOKEN')
        //如果没有则生成
    if (!uid_token) {
        uid_token = nanoid()
        localStorage.setItem('UIDTOKEN', uid_token)
    }
    return uid_token
}