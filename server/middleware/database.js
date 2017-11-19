import mongoose from 'mongoose'
import config from '../config/index'
import fs from 'fs'
import { resolve } from 'path'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
.filter(file => ~file.search(/^[^\.].*\.js$/))
.forEach(file => require(resolve(models, file)))


export const database = app => {
    mongoose.set('debug', true)
    
    mongoose.connect(config.db)
    
    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.db)
    })
    mongoose.connection.on('error', err => {
        console.log(err)
    })
  mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB', config.db)
    
    const User = mongoose.model('User')
    
    // 说明第一次初始化插入数据已经完成
    let user = await User.findOne({email: '455255849@qq.com'}).exec()
    if (!user) new User({email: '455255849@qq.com', password: '123456', role: 'admin'}).save()
  })
  
  
  
}